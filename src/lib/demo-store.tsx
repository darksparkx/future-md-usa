"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  seedState,
  type ActivityTag,
  type AiDraft,
  type ApplicationPacket,
  type Article,
  type DemoState,
  type Enquiry,
  type EnquiryStatus,
  type NextAction,
  type PackageId,
  type PacketStatus,
  type Payment,
  type SiteEvent,
  type StaffRole,
  type Stage,
  type Student,
  type StudyPlan,
  type StudySession,
} from "@/data/demo";

const KEY = "faiz-demo-v1";

type EnquiryInput = Omit<Enquiry, "id" | "status" | "createdAt" | "payment" | "studentId">;

type DemoApi = {
  ready: boolean;
  state: DemoState;
  addEnquiry: (input: EnquiryInput, status?: EnquiryStatus) => string;
  addPaidEnquiry: (input: EnquiryInput, payment: Payment) => string;
  setEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  recordPayment: (enquiryId: string, payment: Payment) => void;
  createStudentFromEnquiry: (enquiryId: string) => string | null;
  setActor: (actor: DemoState["actor"]) => void;
  setRole: (role: StaffRole) => void;
  updateStudent: (id: string, patch: Partial<Student>) => void;
  saveNextAction: (id: string, action: NextAction) => boolean;
  changeStage: (id: string, stage: Stage, reason: string) => boolean;
  toggleCheck: (studentId: string, itemId: string) => void;
  addDocument: (studentId: string, name: string) => void;
  receiveDocument: (studentId: string, docId: string) => void;
  saveAssessment: (id: string, assessment: Student["assessment"]) => void;
  saveStudy: (id: string, study: StudyPlan) => void;
  addSession: (id: string, session: StudySession) => void;
  advancePacket: (studentId: string, note: string) => string | null;
  confirmPacket: (studentId: string) => void;
  reopenPacket: (studentId: string, reason: string) => boolean;
  setItemStatus: (studentId: string, itemId: string, status: ApplicationPacket["items"][number]["status"]) => void;
  addShortlist: (studentId: string, programId: string, note: string) => void;
  moveShortlist: (studentId: string, programId: string, direction: -1 | 1) => void;
  removeShortlist: (studentId: string, programId: string) => void;
  setDraftStatus: (id: string, status: AiDraft["status"]) => void;
  sendChat: (studentId: string, from: "student" | "staff", author: string, body: string) => boolean;
  addActivity: (studentId: string, tag: ActivityTag, author: string, body: string) => boolean;
  addIncident: (summary: string) => boolean;
  setIncidentStatus: (id: string, status: "open" | "closed") => void;
  logAccess: (studentId: string, action: string) => void;
  addArticle: (input: { title: string; category: Article["category"]; dek: string; body: string }) => string;
  removeArticle: (slug: string) => void;
  addEvent: (input: Omit<SiteEvent, "id">) => string;
  removeEvent: (id: string) => void;
  reset: () => void;
};

const DemoContext = createContext<DemoApi | null>(null);

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function blankPacket(): ApplicationPacket {
  return {
    status: "prepare",
    studentConfirmed: false,
    items: [
      { id: "eras", name: "ERAS application", status: "missing" },
      { id: "cv", name: "CV", status: "missing" },
      { id: "ps", name: "Personal statement", status: "missing" },
      { id: "lor", name: "Letters", status: "missing" },
      { id: "list", name: "Program list", status: "missing" },
    ],
    history: [],
  };
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(seedState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DemoState;
        if (parsed?.enquiries && parsed?.students && parsed?.programs) {
          setState({
            ...seedState,
            ...parsed,
            accessLog: parsed.accessLog ?? [],
            messages: parsed.messages ?? seedState.messages,
            activities: parsed.activities ?? seedState.activities,
            incidents: parsed.incidents ?? seedState.incidents,
            vendors: parsed.vendors?.length ? parsed.vendors : seedState.vendors,
            articles: parsed.articles?.length ? parsed.articles : seedState.articles,
            events: parsed.events?.length ? parsed.events : seedState.events,
          });
        }
      }
    } catch {
      /* keep seed */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const api = useMemo<DemoApi>(() => {
    const patchStudent = (id: string, recipe: (student: Student) => Student) => {
      setState((current) => ({
        ...current,
        students: current.students.map((student) => (student.id === id ? recipe(student) : student)),
      }));
    };

    return {
      ready: hydrated,
      state,
      addEnquiry: (input, status = "new") => {
        const id = uid("enq");
        const enquiry: Enquiry = {
          ...input,
          id,
          status,
          createdAt: new Date().toISOString().slice(0, 10),
        };
        setState((current) => ({ ...current, enquiries: [enquiry, ...current.enquiries] }));
        return id;
      },
      addPaidEnquiry: (input, payment: Payment) => {
        const id = uid("enq");
        const enquiry: Enquiry = {
          ...input,
          id,
          status: "booked",
          createdAt: new Date().toISOString().slice(0, 10),
          payment,
        };
        setState((current) => ({ ...current, enquiries: [enquiry, ...current.enquiries] }));
        return id;
      },
      setEnquiryStatus: (id, status) => {
        setState((current) => ({
          ...current,
          enquiries: current.enquiries.map((enquiry) => (enquiry.id === id ? { ...enquiry, status } : enquiry)),
        }));
      },
      recordPayment: (enquiryId, payment) => {
        setState((current) => ({
          ...current,
          enquiries: current.enquiries.map((enquiry) =>
            enquiry.id === enquiryId ? { ...enquiry, payment, status: enquiry.status === "new" ? "booked" : enquiry.status } : enquiry,
          ),
        }));
      },
      createStudentFromEnquiry: (enquiryId) => {
        const enquiry = state.enquiries.find((item) => item.id === enquiryId);
        if (!enquiry?.payment || enquiry.studentId) return null;
        const id = uid("stu");
        const student: Student = {
            id,
            enquiryId,
            name: enquiry.name,
            email: enquiry.email,
            phone: enquiry.phone,
            school: enquiry.school,
            country: enquiry.country,
            year: enquiry.year,
            graduationYear: enquiry.graduationYear,
            stage: 0,
            stageReason: "Opened from a paid website enquiry. Stage stays Exploring until the assessment says otherwise.",
            strengths: [],
            gaps: ["Assessment not done yet"],
            objective: "Finish the first assessment and name the real stage.",
            milestone: "Assessment complete",
            checklist: [
              { id: uid("chk"), label: "Finish the first assessment", done: false },
              { id: uid("chk"), label: "Agree the next 90 days", done: false },
              { id: uid("chk"), label: "Name the next action with a deadline", done: true },
            ],
            roadmap: ["Medical school", "USMLE", "U.S. clinical experience", "Profile", "ERAS", "Interviews", "Match"],
            updates: "Account created from the website payment. No journey notes yet.",
            notes: "",
            nextAction: {
              goal: "A true stage, not a guess from the enquiry form",
              bottleneck: "We have payment and a short note, not an assessment",
              nextStep: "Hold the assessment and write the stage with a reason",
              owner: "Meera Iyer",
              deadline: "2026-10-29",
            },
            counselor: "Meera Iyer",
            packageId: enquiry.payment.packageId,
            payment: { ...enquiry.payment, balance: 0 },
            documents: [{ id: uid("doc"), name: "Photo ID" }],
            caseConference: false,
            caseNotes: "",
            assessment: {
              academic: `${enquiry.year} at ${enquiry.school}. Step status: ${enquiry.stepStatus}.`,
              career: enquiry.specialty ? `Interest noted: ${enquiry.specialty}.` : "",
              clinical: "",
              research: "",
              admin: "",
              personal: enquiry.message,
            },
            study: {
              level: enquiry.year,
              studyTime: "",
              examDate: "",
              uworldNotes: "",
              selfAssessment: "",
              weakSubjects: "",
              attempts: enquiry.stepStatus,
              sessions: [],
            },
            shortlist: [],
            packet: blankPacket(),
            ecfmg: [
              { item: "MyIntealth account", owner: "Coordinator", checked: "2026-10-15", done: false },
              { item: "Step 1", owner: "Counselor", checked: "2026-10-15", done: false },
              { item: "Step 2 CK", owner: "Counselor", checked: "2026-10-15", done: false },
              { item: "Pathway", owner: "Operations", checked: "2026-10-15", done: false },
              { item: "OET Medicine", owner: "Counselor", checked: "2026-10-15", done: false },
              { item: "Certification", owner: "Operations", checked: "2026-10-15", done: false },
            ],
            rotation: { site: "Not planned", specialty: enquiry.specialty || "—", status: "Not started" },
            lor: { physician: "—", status: "not-started" },
          };
        setState((current) => {
          if (current.enquiries.some((item) => item.id === enquiryId && item.studentId)) return current;
          return {
            ...current,
            students: [student, ...current.students],
            enquiries: current.enquiries.map((item) => (item.id === enquiryId ? { ...item, studentId: id, status: "closed" as const } : item)),
          };
        });
        return id;
      },
      setActor: (actor) => setState((current) => ({ ...current, actor })),
      setRole: (role) => setState((current) => ({ ...current, role })),
      updateStudent: (id, patch) => patchStudent(id, (student) => ({ ...student, ...patch })),
      saveNextAction: (id, action) => {
        const complete = [action.goal, action.bottleneck, action.nextStep, action.owner, action.deadline].every((value) => value.trim());
        if (!complete) return false;
        patchStudent(id, (student) => ({ ...student, nextAction: action }));
        return true;
      },
      changeStage: (id, stage, reason) => {
        if (!reason.trim()) return false;
        patchStudent(id, (student) => ({ ...student, stage, stageReason: reason.trim() }));
        return true;
      },
      toggleCheck: (studentId, itemId) => {
        patchStudent(studentId, (student) => ({
          ...student,
          checklist: student.checklist.map((item) => (item.id === itemId ? { ...item, done: !item.done } : item)),
        }));
      },
      addDocument: (studentId, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const today = new Date().toISOString().slice(0, 10);
        patchStudent(studentId, (student) => {
          const existing = student.documents.find((doc) => doc.name.toLowerCase() === trimmed.toLowerCase());
          if (existing?.uploadedAt) return student;
          if (existing) {
            return {
              ...student,
              documents: student.documents.map((doc) => (doc.id === existing.id ? { ...doc, uploadedAt: today } : doc)),
            };
          }
          return {
            ...student,
            documents: [...student.documents, { id: uid("doc"), name: trimmed, uploadedAt: today }],
          };
        });
      },
      receiveDocument: (studentId, docId) => {
        const today = new Date().toISOString().slice(0, 10);
        patchStudent(studentId, (student) => ({
          ...student,
          documents: student.documents.map((doc) =>
            doc.id === docId && !doc.uploadedAt ? { ...doc, uploadedAt: today } : doc,
          ),
        }));
      },
      saveAssessment: (id, assessment) => patchStudent(id, (student) => ({ ...student, assessment })),
      saveStudy: (id, study) => patchStudent(id, (student) => ({ ...student, study })),
      addSession: (id, session) => {
        patchStudent(id, (student) => ({
          ...student,
          study: { ...student.study, sessions: [session, ...student.study.sessions] },
        }));
      },
      advancePacket: (studentId, note) => {
        let error: string | null = null;
        setState((current) => {
          const student = current.students.find((item) => item.id === studentId);
          if (!student) return current;
          const order: PacketStatus[] = ["prepare", "review", "confirm", "submitted"];
          const index = order.indexOf(student.packet.status);
          const next = order[index + 1];
          if (!next) {
            error = "This packet is already submitted.";
            return current;
          }
          if (next === "review" && !["counselor", "ops"].includes(current.role)) {
            error = "A counselor prepares the packet and sends it to review.";
            return current;
          }
          if (next === "confirm" && !["physician", "ops"].includes(current.role)) {
            error = "A senior reviewer moves the packet to student confirmation.";
            return current;
          }
          if (next === "submitted") {
            if (!student.packet.studentConfirmed) {
              error = "The student has to confirm the facts first.";
              return current;
            }
            if (!["coordinator", "ops", "counselor"].includes(current.role)) {
              error = "Submission is an operations step after confirmation.";
              return current;
            }
          }
          if (!note.trim()) {
            error = "Write a note for this step.";
            return current;
          }
          const by = current.role;
          return {
            ...current,
            students: current.students.map((item) =>
              item.id === studentId
                ? {
                    ...item,
                    packet: {
                      ...item.packet,
                      status: next,
                      submittedAt: next === "submitted" ? new Date().toISOString().slice(0, 10) : item.packet.submittedAt,
                      history: [
                        ...item.packet.history,
                        { at: new Date().toISOString().slice(0, 10), status: next, note: note.trim(), by },
                      ],
                    },
                  }
                : item,
            ),
          };
        });
        return error;
      },
      confirmPacket: (studentId) => {
        patchStudent(studentId, (student) => ({
          ...student,
          packet: student.packet.status === "confirm" ? { ...student.packet, studentConfirmed: true } : student.packet,
        }));
      },
      reopenPacket: (studentId, reason) => {
        if (!reason.trim()) return false;
        let ok = false;
        setState((current) => {
          if (current.role !== "ops") return current;
          ok = true;
          return {
            ...current,
            students: current.students.map((student) =>
              student.id === studentId
                ? {
                    ...student,
                    packet: {
                      ...student.packet,
                      status: "prepare",
                      studentConfirmed: false,
                      submittedAt: undefined,
                      history: [
                        ...student.packet.history,
                        {
                          at: new Date().toISOString().slice(0, 10),
                          status: "prepare",
                          note: `Reopened: ${reason.trim()}`,
                          by: "ops",
                        },
                      ],
                    },
                  }
                : student,
            ),
          };
        });
        return ok;
      },
      setItemStatus: (studentId, itemId, status) => {
        patchStudent(studentId, (student) => ({
          ...student,
          packet: {
            ...student.packet,
            items: student.packet.items.map((item) => (item.id === itemId ? { ...item, status } : item)),
          },
        }));
      },
      addShortlist: (studentId, programId, note) => {
        if (!note.trim()) return;
        patchStudent(studentId, (student) => {
          if (student.shortlist.some((item) => item.programId === programId)) return student;
          return {
            ...student,
            shortlist: [
              ...student.shortlist,
              {
                programId,
                rank: student.shortlist.length + 1,
                note: note.trim(),
                added: new Date().toISOString().slice(0, 10),
              },
            ],
          };
        });
      },
      moveShortlist: (studentId, programId, direction) => {
        patchStudent(studentId, (student) => {
          const list = [...student.shortlist].sort((a, b) => a.rank - b.rank);
          const index = list.findIndex((item) => item.programId === programId);
          const swap = index + direction;
          if (index < 0 || swap < 0 || swap >= list.length) return student;
          const current = list[index];
          const other = list[swap];
          if (!current || !other) return student;
          const a = current.rank;
          current.rank = other.rank;
          other.rank = a;
          return { ...student, shortlist: list };
        });
      },
      removeShortlist: (studentId, programId) => {
        patchStudent(studentId, (student) => {
          const list = student.shortlist
            .filter((item) => item.programId !== programId)
            .sort((a, b) => a.rank - b.rank)
            .map((item, index) => ({ ...item, rank: index + 1 }));
          return { ...student, shortlist: list };
        });
      },
      sendChat: (studentId, from, author, body) => {
        const text = body.trim();
        if (!text || text.length > 500) return false;
        setState((current) => ({
          ...current,
          messages: [
            { id: uid("msg"), studentId, from, author: author.trim() || "Staff", body: text, at: new Date().toISOString() },
            ...current.messages,
          ],
        }));
        return true;
      },
      addActivity: (studentId, tag, author, body) => {
        const text = body.trim();
        if (!text) return false;
        setState((current) => ({
          ...current,
          activities: [
            { id: uid("act"), studentId, tag, author: author.trim() || "Staff", body: text, at: new Date().toISOString() },
            ...current.activities,
          ],
        }));
        return true;
      },
      addIncident: (summary) => {
        const text = summary.trim();
        if (!text) return false;
        setState((current) => ({
          ...current,
          incidents: [{ id: uid("inc"), at: new Date().toISOString().slice(0, 10), summary: text, status: "open" }, ...current.incidents],
        }));
        return true;
      },
      setIncidentStatus: (id, status) => {
        setState((current) => ({
          ...current,
          incidents: current.incidents.map((item) => (item.id === id ? { ...item, status } : item)),
        }));
      },
      setDraftStatus: (id, status) => {
        setState((current) => ({
          ...current,
          drafts: current.drafts.map((draft) => (draft.id === id ? { ...draft, status } : draft)),
        }));
      },
      logAccess: (studentId, action) => {
        setState((current) => {
          if (current.role !== "physician") return current;
          const last = current.accessLog[0];
          if (last && last.studentId === studentId && last.action === action) return current;
          return {
            ...current,
            accessLog: [
              {
                id: uid("log"),
                at: new Date().toISOString(),
                role: current.role,
                studentId,
                action,
              },
              ...current.accessLog,
            ].slice(0, 20),
          };
        });
      },
      addArticle: (input) => {
        const base = input.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || "piece";
        const taken = new Set(state.articles.map((article) => article.slug));
        let slug = base;
        let n = 2;
        while (taken.has(slug)) slug = `${base}-${n++}`;
        const words = input.body.trim().split(/\s+/).filter(Boolean).length;
        const article: Article = {
          slug,
          category: input.category,
          title: input.title.trim(),
          dek: input.dek.trim(),
          minutes: Math.max(1, Math.round(words / 180)),
          body: input.body
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean),
        };
        setState((current) => ({ ...current, articles: [article, ...current.articles] }));
        return slug;
      },
      removeArticle: (slug) => {
        setState((current) => ({
          ...current,
          articles: current.articles.filter((article) => article.slug !== slug),
        }));
      },
      addEvent: (input) => {
        const id = uid("evt");
        const event: SiteEvent = { ...input, id, title: input.title.trim(), detail: input.detail.trim(), audience: input.audience.trim() };
        setState((current) => ({ ...current, events: [...current.events, event] }));
        return id;
      },
      removeEvent: (id) => {
        setState((current) => ({
          ...current,
          events: current.events.filter((event) => event.id !== id),
        }));
      },
      reset: () => setState(seedState),
    };
  }, [state, hydrated]);

  return <DemoContext.Provider value={api}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used inside DemoProvider");
  return value;
}

export function packageById(id: string): PackageId | null {
  if (id === "A" || id === "B" || id === "C") return id;
  return null;
}
