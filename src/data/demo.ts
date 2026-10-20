export type PackageId = "A" | "B" | "C";
export type EnquiryStatus = "new" | "contacted" | "booked" | "closed";
export type PayMethod = "card" | "upi";
export type Stage = 0 | 1 | 2 | 3 | 4 | 5;
export type StaffRole = "ops" | "counselor" | "coordinator" | "physician";
export type PacketStatus = "prepare" | "review" | "confirm" | "submitted";
export type ItemStatus = "missing" | "attached" | "reviewed";
export type DraftStatus = "pending" | "approved" | "rejected";
export type MistakeTag =
  | "Knowledge gap"
  | "Misreading"
  | "Reasoning error"
  | "Timing issue"
  | "Careless error";

export type Payment = {
  amount: number;
  method: PayMethod;
  date: string;
  packageId: PackageId;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  country: string;
  year: string;
  graduationYear: string;
  stepStatus: string;
  specialty: string;
  source: string;
  packageInterest: PackageId | "";
  message: string;
  status: EnquiryStatus;
  payment?: Payment;
  studentId?: string;
  createdAt: string;
};

export type ChecklistItem = { id: string; label: string; done: boolean };

export type NextAction = {
  goal: string;
  bottleneck: string;
  nextStep: string;
  owner: string;
  deadline: string;
};

export type DocumentItem = {
  id: string;
  name: string;
  uploadedAt?: string;
};

export type Assessment = {
  academic: string;
  career: string;
  clinical: string;
  research: string;
  admin: string;
  personal: string;
};

export type StudySession = {
  id: string;
  date: string;
  note: string;
  tag: MistakeTag;
};

export type StudyPlan = {
  level: string;
  studyTime: string;
  examDate: string;
  uworldNotes: string;
  selfAssessment: string;
  weakSubjects: string;
  attempts: string;
  sessions: StudySession[];
};

export type ShortlistItem = {
  programId: string;
  rank: number;
  note: string;
  added: string;
};

export type PacketItem = {
  id: string;
  name: string;
  status: ItemStatus;
};

export type PacketHistory = {
  at: string;
  status: PacketStatus;
  note: string;
  by: string;
};

export type ApplicationPacket = {
  status: PacketStatus;
  items: PacketItem[];
  history: PacketHistory[];
  studentConfirmed: boolean;
  submittedAt?: string;
};

export type LorStatus = "requested" | "received" | "declined" | "not-started";

export type Student = {
  id: string;
  enquiryId?: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  country: string;
  year: string;
  graduationYear: string;
  stage: Stage;
  stageReason: string;
  strengths: string[];
  gaps: string[];
  objective: string;
  milestone: string;
  checklist: ChecklistItem[];
  roadmap: string[];
  updates: string;
  notes: string;
  nextAction: NextAction;
  counselor: string;
  packageId: PackageId;
  payment?: Payment & { balance: number };
  documents: DocumentItem[];
  caseConference: boolean;
  caseNotes: string;
  assessment: Assessment;
  study: StudyPlan;
  shortlist: ShortlistItem[];
  packet: ApplicationPacket;
  ecfmg: { item: string; owner: string; checked: string; done: boolean }[];
  rotation: { site: string; specialty: string; status: string };
  lor: { physician: string; status: LorStatus };
};

export type Program = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  img: string;
  visa: string;
  requirements: string;
  usce: string;
  research: string;
  preferences: string;
  source: string;
  verified: string;
};

export type AiDraft = {
  id: string;
  studentId: string;
  kind: string;
  body: string;
  status: DraftStatus;
};

export type AccessLog = {
  id: string;
  at: string;
  role: StaffRole;
  studentId: string;
  action: string;
};

export type ActivityTag = "study" | "document" | "stage" | "clinical" | "application";

export type ChatMessage = {
  id: string;
  studentId: string;
  from: "student" | "staff";
  author: string;
  body: string;
  at: string;
};

export type ActivityNote = {
  id: string;
  studentId: string;
  tag: ActivityTag;
  author: string;
  body: string;
  at: string;
};

export type Incident = {
  id: string;
  at: string;
  summary: string;
  status: "open" | "closed";
};

export type Vendor = {
  name: string;
  purpose: string;
  data: string;
};

export type DemoState = {
  enquiries: Enquiry[];
  students: Student[];
  programs: Program[];
  drafts: AiDraft[];
  accessLog: AccessLog[];
  messages: ChatMessage[];
  activities: ActivityNote[];
  incidents: Incident[];
  vendors: Vendor[];
  articles: Article[];
  events: SiteEvent[];
  role: StaffRole;
  actor: { kind: "student" | "instructor"; studentId: string };
};

export const stages: { id: Stage; name: string; student: string; focus: string; question: string }[] = [
  {
    id: 0,
    name: "Exploring",
    student: "I heard about USMLE. Is this even for me?",
    focus: "Learn the U.S. path, weigh the career, the time, and the cost, and hear what is hard as well as what helps. Rotations and later services stay on hold.",
    question: "Is this path mine?",
  },
  {
    id: 1,
    name: "Foundation",
    student: "I have chosen USMLE, and I am still early in medical school.",
    focus: "The base comes first: how the exams work, how to study, and a first way through a question bank. A specialty can stay a question. It does not have to be a choice yet.",
    question: "How do I build myself into a strong candidate?",
  },
  {
    id: 2,
    name: "Step 1",
    student: "I am actively preparing.",
    focus: "A personal study plan, UWorld method, weakness tracking, self-assessments, scheduling, and remediation after each assessment.",
    question: "What do I need to do to become exam-ready?",
  },
  {
    id: 3,
    name: "Step 2 + profile",
    student: "Step 1 is done. Step 2 CK and the residency profile are next.",
    focus: "Step 2 CK, clinical reasoning, U.S. clinical experience planning, specialty selection, research, mentorship, letters, and ECFMG requirements.",
    question: "How do I become a competitive applicant?",
  },
  {
    id: 4,
    name: "Application",
    student: "Residency applications are close.",
    focus: "ECFMG completion, ERAS, CV, personal statement, letters, program research, and interview preparation.",
    question: "Where should I apply, and how do I present myself?",
  },
  {
    id: 5,
    name: "Match",
    student: "Interviews and the rank list are the work now.",
    focus: "Interview preparation and feedback, program research, rank-order strategy, and a real contingency plan.",
    question: "How do I finish this process correctly?",
  },
];

export const pillars = [
  {
    name: "How to study for the exams",
    paragraphs: [
      "This is teaching a way to prepare, not handing over a book list. Step 1 and Step 2 CK each get a plan built around the year of medical school, the hours available, the exam date, and how the last self-assessment went. A student who is weak in a subject does not get the same plan as a student who keeps misreading the question.",
      "Work in a question bank follows a method: try it, commit to an answer, review it, name the kind of mistake, and practice that gap again. Finishing the bank is not the point. Getting better at the questions the exam asks is. Weak subjects are tracked, and someone says plainly whether it is time to sit. The bank itself stays outside this product.",
    ],
  },
  {
    name: "Clinical time, and the profile around it",
    paragraphs: [
      "Once the studying is far enough along, the question is what the profile still needs. That might be time in a U.S. clinic, a clearer specialty, research, mentorship, or a CV that describes work the student has actually done. Not every student needs all of those at once.",
      "The rotations are real clinical work with physicians. A letter is written only when a physician has assessed the student. Paying for a rotation does not come with a letter, and it does not come with a residency.",
    ],
  },
  {
    name: "The residency application",
    paragraphs: [
      "Closer to applying, the work is the file programs will read. That means the profile as an international graduate, what ECFMG still requires, ERAS, the personal statement, and how letters should be used. Programs are researched for fit. Interviews and the order of the rank list come after the file is honest.",
      "A shortlist is a judgment about which programs make sense. It is not a prediction of who will match.",
    ],
  },
  {
    name: "A plan with dates on it",
    paragraphs: [
      "Each student has a longer roadmap and a working plan for the next ninety days. The working plan is weekly actions, milestones, and deadlines, with a name on the next step. If something stalls, it is raised then, not found out at the exam. One student’s calendar is not copied onto the next.",
    ],
  },
];

export const packages: {
  id: PackageId;
  name: string;
  forWhom: string;
  includes: string[];
  sampleFee: number;
}[] = [
  {
    id: "A",
    name: "Roadmap & Academic Guidance",
    forWhom: "For someone still early, who needs a stage and a way to study.",
    includes: [
      "We assess where you are and place you in a stage.",
      "You get a study plan, and a method for reviewing questions.",
      "The next ninety days are written down, with check-ins along the way.",
    ],
    sampleFee: 1800,
  },
  {
    id: "B",
    name: "Full Journey",
    forWhom: "For the whole path, from studying through clinical time and the application.",
    includes: [
      "Everything in Package A is included.",
      "When you are ready, this adds U.S. clinical time, mentorship, research where it fits, and work on the CV.",
      "Residency preparation stays on the same path through applications and interviews.",
    ],
    sampleFee: 4200,
  },
  {
    id: "C",
    name: "Residency & Application",
    forWhom: "For a student who is already close to applying.",
    includes: [
      "We review the application before it goes out.",
      "You get a short list of programs that fit, with a note on why each one is there.",
      "We prepare you for interviews and for the order of the rank list.",
    ],
    sampleFee: 7500,
  },
];

export const notGuaranteed = [
  "We do not promise a Match.",
  "We do not promise an interview invitation.",
  "We do not promise a letter of recommendation.",
  "We do not promise a visa.",
];

export const resourceCategories = [
  "USMLE 101",
  "Study strategy",
  "Career",
  "U.S. experience",
  "Residency",
  "Real experiences",
] as const;

export type Article = {
  slug: string;
  category: (typeof resourceCategories)[number];
  title: string;
  dek: string;
  minutes: number;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "what-stage-am-i-in",
    category: "USMLE 101",
    title: "What stage am I in?",
    dek: "A third-year student who has never opened a Step 1 book does not get the same roadmap as someone who has passed Step 2 CK.",
    minutes: 6,
    body: [
      "Most students arrive with a pile of advice: start UWorld now, book a rotation, write a personal statement, pick a specialty. Almost none of that advice asks where the student actually is.",
      "We use six stages. Exploring means the question is still “is this for me?” Foundation means the decision is made and the work is habits, not a test date. Step 1 and Step 2 are exam stages with different jobs. Application and Match are presentation and decision stages.",
      "The useful sentence is not “I am preparing for USMLE.” It is “I am in Foundation, my milestone is a study system, and my next action is due Friday.”",
      "If you are early, we will not sell you a rotation. If you are late, we will not hand you a beginner lecture and call it a plan. The stage decides the work.",
    ],
  },
  {
    slug: "question-review-is-the-work",
    category: "Study strategy",
    title: "The goal is not to finish UWorld",
    dek: "Question, attempt, commit, review, diagnose the mistake, reinforce, track the weakness. The bank stays outside this product. The method does not.",
    minutes: 7,
    body: [
      "Finishing a question bank is a number. Becoming better at the kind of question the exam asks is the actual job.",
      "For every incorrect or uncertain item, name the reason: knowledge gap, misreading, reasoning error, pattern-recognition failure, recall failure, timing, a changed correct answer, or a careless error. A renal physiology gap and a misread stem need different next weeks.",
      "We record the plan, the numbers you report, and those mistake tags. We do not store question text, and we do not run a question bank inside the platform. UWorld stays where it is.",
      "Resources, policies, and exam details change. The method is reviewed against current official sources, not against last year’s rumor.",
    ],
  },
];

export type SiteEvent = {
  id: string;
  title: string;
  when: string;
  time: string;
  where: string;
  audience: string;
  detail: string;
};

export const events: SiteEvent[] = [
  {
    id: "hyd-usmle",
    title: "Is USMLE for me?",
    when: "Saturday, 6 December 2026",
    time: "10:00–13:00 IST",
    where: "Hyderabad",
    audience: "For students early in medical school, and parents who want the plain version.",
    detail:
      "A physician explains what the exams are, how long the path takes, and what is worth doing in the first year. There is time for questions. This is not an application workshop.",
  },
  {
    id: "blr-step1",
    title: "How to study for Step 1",
    when: "Saturday, 17 January 2027",
    time: "10:00–12:30 IST",
    where: "Bengaluru",
    audience: "For students who have decided on USMLE and are about to start Step 1.",
    detail:
      "How to work through a question bank, how to read a wrong answer, and how a practice test should change the next month.",
  },
  {
    id: "online-clinic",
    title: "What time in a U.S. clinic actually is",
    when: "Saturday, 21 February 2027",
    time: "18:00–19:30 IST",
    where: "Online",
    audience: "For students who have been told they need a rotation and are not sure what that means.",
    detail:
      "What a real rotation looks like, when it belongs on the path, and why a letter only counts after a physician has seen the work.",
  },
  {
    id: "mum-parents",
    title: "An evening for parents",
    when: "Saturday, 14 March 2027",
    time: "16:00–18:00 IST",
    where: "Mumbai",
    audience: "For parents who want the timeline, the costs, and what we will not promise.",
    detail:
      "The path from medical school to Match, which costs sit outside the package, and the risks a plan cannot remove.",
  },
];

export const roleLabels: Record<StaffRole, string> = {
  ops: "Operations head",
  counselor: "Senior counselor",
  coordinator: "Coordinator",
  physician: "U.S. physician",
};

const packet = (status: PacketStatus, confirmed: boolean): ApplicationPacket => ({
  status,
  studentConfirmed: confirmed,
  submittedAt: status === "submitted" ? "2026-09-18" : undefined,
  items: [
    { id: "eras", name: "ERAS application", status: status === "prepare" ? "attached" : "reviewed" },
    { id: "cv", name: "CV", status: "reviewed" },
    { id: "ps", name: "Personal statement", status: status === "prepare" ? "attached" : "reviewed" },
    { id: "lor", name: "Letters", status: status === "prepare" ? "missing" : "attached" },
    { id: "list", name: "Program list", status: status === "prepare" ? "missing" : "reviewed" },
  ],
  history: [
    { at: "2026-08-02", status: "prepare", note: "Counselor assembled the first packet.", by: "Senior counselor" },
    ...(status !== "prepare"
      ? [{ at: "2026-08-20", status: "review" as const, note: "Sent for senior review.", by: "Senior counselor" }]
      : []),
  ],
});

export const seedStudents: Student[] = [
  {
    id: "stu-ananya",
    enquiryId: "enq-ananya",
    name: "Ananya Rao",
    email: "ananya.rao@example.com",
    phone: "+91 98450 11021",
    school: "Osmania Medical College",
    country: "India",
    year: "3rd year",
    graduationYear: "2028",
    stage: 1,
    stageReason: "Decision to pursue USMLE is made. No dedicated exam work yet, so Foundation is the honest stage.",
    strengths: ["Strong academic foundation", "Early start"],
    gaps: ["No structured USMLE preparation", "No specialty direction"],
    objective: "Build a foundation and establish a Step 1 strategy.",
    milestone: "Ready for dedicated Step 1 preparation",
    checklist: [
      { id: "c1", label: "Establish a weekly study system", done: true },
      { id: "c2", label: "Learn the question-review method", done: true },
      { id: "c3", label: "Begin a structured block schedule", done: false },
      { id: "c4", label: "Track the first month of performance", done: false },
      { id: "c5", label: "Reassess stage at day 90", done: false },
    ],
    roadmap: [
      "Medical school",
      "USMLE",
      "U.S. clinical experience",
      "Profile",
      "ERAS",
      "Interviews",
      "Match",
    ],
    updates: "Week of 6 Oct: study blocks are holding. Specialty talk stays light until the method is stable.",
    notes: "Parents asked about cost and timeline. Point them to the public parents page. Do not discuss rotations yet.",
    nextAction: {
      goal: "A repeatable question-review habit",
      bottleneck: "Reviews are still summary notes, not mistake types",
      nextStep: "Complete the assigned question block and classify every error by Friday",
      owner: "Ananya Rao",
      deadline: "2026-10-17",
    },
    counselor: "Meera Iyer",
    packageId: "A",
    payment: { amount: 1800, method: "upi", date: "2026-09-12", packageId: "A", balance: 0 },
    documents: [
      { id: "d1", name: "Medical school transcript", uploadedAt: "2026-09-14" },
      { id: "d2", name: "Passport bio page" },
    ],
    caseConference: false,
    caseNotes: "",
    assessment: {
      academic: "Third year, Osmania. No Step attempts. UWorld not started. Strong college exams.",
      career: "Wants the U.S. for training depth. Specialty open. Internal medicine is a maybe, not a plan.",
      clinical: "No U.S. clinical experience. College postings only.",
      research: "One campus poster. No publications.",
      admin: "ECFMG not started. No OET. Visa not relevant yet.",
      personal: "Family budget is planned in stages. Prefers a city program later. Parents are involved in the decision.",
    },
    study: {
      level: "Foundation · 3rd year",
      studyTime: "12 hours a week beside college",
      examDate: "Not scheduled",
      uworldNotes: "Bank not started. Method practice on a short mixed set only.",
      selfAssessment: "None yet",
      weakSubjects: "Not measured. Suspect biostats from college feedback.",
      attempts: "None",
      sessions: [
        { id: "s1", date: "2026-10-08", note: "Missed a stem that changed the diagnosis in the last line.", tag: "Misreading" },
      ],
    },
    shortlist: [],
    packet: packet("prepare", false),
    ecfmg: [
      { item: "MyIntealth account", owner: "Coordinator", checked: "2026-09-01", done: false },
      { item: "Medical school eligibility", owner: "Coordinator", checked: "2026-09-01", done: false },
      { item: "Step 1", owner: "Counselor", checked: "2026-10-01", done: false },
      { item: "Step 2 CK", owner: "Counselor", checked: "2026-10-01", done: false },
      { item: "Pathway", owner: "Operations", checked: "2026-09-01", done: false },
      { item: "OET Medicine", owner: "Counselor", checked: "2026-09-01", done: false },
      { item: "Certification", owner: "Operations", checked: "2026-09-01", done: false },
    ],
    rotation: { site: "Not planned", specialty: "—", status: "Too early" },
    lor: { physician: "—", status: "not-started" },
  },
  {
    id: "stu-karthik",
    name: "Karthik Menon",
    email: "karthik.menon@example.com",
    phone: "+91 98840 22018",
    school: "Government Medical College, Kozhikode",
    country: "India",
    year: "Intern",
    graduationYear: "2026",
    stage: 3,
    stageReason: "Step 1 passed on the first attempt. Work has shifted to Step 2 CK and profile.",
    strengths: ["Step 1 passed", "Consistent study hours"],
    gaps: ["No U.S. clinical experience", "Specialty still split between IM and neuro"],
    objective: "Become a competitive applicant, not just an exam-ready one.",
    milestone: "Step 2 CK date locked, with a rotation plan beside it",
    checklist: [
      { id: "k1", label: "Lock a Step 2 window", done: false },
      { id: "k2", label: "Name one specialty to test for 90 days", done: false },
      { id: "k3", label: "List ECFMG items still open", done: true },
    ],
    roadmap: ["Medical school", "USMLE", "U.S. clinical experience", "Profile", "ERAS", "Interviews", "Match"],
    updates: "Overdue: Step 2 window is still “sometime next year.”",
    notes: "Bring to case conference if the exam date slips past November.",
    nextAction: {
      goal: "A real Step 2 CK date",
      bottleneck: "Waiting for a perfect NBME before choosing a month",
      nextStep: "Pick two candidate months and send them to Meera by Wednesday",
      owner: "Karthik Menon",
      deadline: "2026-10-08",
    },
    counselor: "Meera Iyer",
    packageId: "B",
    payment: { amount: 7500, method: "card", date: "2026-06-02", packageId: "B", balance: 0 },
    documents: [{ id: "kdoc", name: "Step 1 score report", uploadedAt: "2026-06-11" }],
    caseConference: true,
    caseNotes: "Date anxiety. Do not add a rotation until the exam month exists.",
    assessment: {
      academic: "Intern. Step 1 passed, first attempt. Step 2 CK not scheduled. UWorld Step 2 about 30% by his report.",
      career: "Split between internal medicine and neurology. Wants a visa-sponsoring program later.",
      clinical: "No USCE. Strong internship load.",
      research: "One audit in college. No poster outside campus.",
      admin: "ECFMG application started. Pathway not chosen. OET not booked.",
      personal: "Can fund one rotation season. Family wants a clear timeline before more spend.",
    },
    study: {
      level: "Step 2 CK",
      studyTime: "25 hours a week",
      examDate: "Unscheduled",
      uworldNotes: "Reports ~30% complete. Reviews are uneven on timed blocks.",
      selfAssessment: "NBME not taken",
      weakSubjects: "Neurology localization, biostatistics",
      attempts: "Step 1: one pass. Step 2: none",
      sessions: [
        { id: "ks1", date: "2026-10-03", note: "Ran out of time on the last six questions.", tag: "Timing issue" },
        { id: "ks2", date: "2026-10-06", note: "Knew the fact and picked the adjacent answer.", tag: "Careless error" },
      ],
    },
    shortlist: [
      {
        programId: "prog-im-midwest",
        rank: 1,
        note: "IMG notes are documented and the visa line was checked this quarter. Fits a medicine lean.",
        added: "2026-09-28",
      },
    ],
    packet: packet("prepare", false),
    ecfmg: [
      { item: "MyIntealth account", owner: "Coordinator", checked: "2026-07-12", done: true },
      { item: "Credential verification", owner: "Coordinator", checked: "2026-08-01", done: false },
      { item: "Step 1", owner: "Counselor", checked: "2026-06-11", done: true },
      { item: "Step 2 CK", owner: "Counselor", checked: "2026-10-01", done: false },
      { item: "Pathway", owner: "Operations", checked: "2026-09-15", done: false },
      { item: "OET Medicine", owner: "Counselor", checked: "2026-09-15", done: false },
      { item: "Certification", owner: "Operations", checked: "2026-09-15", done: false },
    ],
    rotation: { site: "To be chosen after exam month", specialty: "Internal medicine", status: "Holding" },
    lor: { physician: "—", status: "not-started" },
  },
  {
    id: "stu-fathima",
    name: "Fathima Nizar",
    email: "fathima.nizar@example.com",
    phone: "+91 97440 11820",
    school: "Kasturba Medical College, Manipal",
    country: "India",
    year: "Graduate",
    graduationYear: "2024",
    stage: 4,
    stageReason: "Exams are done. The work is the application packet and the program list.",
    strengths: ["Step 1 and Step 2 CK done", "Two months of U.S. inpatient medicine"],
    gaps: ["Personal statement still sounds like a CV", "Program list is longer than the profile supports"],
    objective: "A packet a senior reviewer can stand behind.",
    milestone: "Student confirms facts, then the packet can be marked submitted",
    checklist: [
      { id: "f1", label: "Senior review of the personal statement", done: true },
      { id: "f2", label: "Confirm every date on the CV", done: false },
      { id: "f3", label: "Cut the program list to the ranked shortlist", done: false },
    ],
    roadmap: ["Medical school", "USMLE", "U.S. clinical experience", "Profile", "ERAS", "Interviews", "Match"],
    updates: "Packet is in senior review. Student confirmation is the next gate.",
    notes: "Letter from the inpatient attending is received. Second letter is still requested — never promised.",
    nextAction: {
      goal: "Factual confirmation of the packet",
      bottleneck: "CV dates for the 2023 audit do not match the certificate",
      nextStep: "Student confirms or corrects the flagged dates",
      owner: "Fathima Nizar",
      deadline: "2026-10-22",
    },
    counselor: "Meera Iyer",
    packageId: "C",
    payment: { amount: 4200, method: "card", date: "2026-04-03", packageId: "C", balance: 0 },
    documents: [
      { id: "fdoc1", name: "ERAS worksheet", uploadedAt: "2026-09-02" },
      { id: "fdoc2", name: "CV draft", uploadedAt: "2026-09-20" },
    ],
    caseConference: false,
    caseNotes: "",
    assessment: {
      academic: "Graduate 2024. Step 1 and Step 2 CK passed, first attempts. No failures.",
      career: "Internal medicine. Open to a community program with a teaching reputation.",
      clinical: "Eight weeks U.S. inpatient medicine, 2025.",
      research: "One poster. No claim of a publication.",
      admin: "ECFMG certified. Pathway complete. OET passed.",
      personal: "Will apply this cycle. Geographic preference: East Coast, not a requirement.",
    },
    study: {
      level: "Application year",
      studyTime: "Interview prep, 6 hours a week",
      examDate: "Exams complete",
      uworldNotes: "Bank finished before Step 2. No question text stored.",
      selfAssessment: "Step 2 CK passed",
      weakSubjects: "None active",
      attempts: "Step 1 pass, Step 2 CK pass",
      sessions: [],
    },
    shortlist: [
      {
        programId: "prog-im-midwest",
        rank: 1,
        note: "Documented IMG and visa notes. Graduation year is inside what the program page states.",
        added: "2026-09-12",
      },
      {
        programId: "prog-im-east",
        rank: 2,
        note: "Research line is light. Added because USCE specialty matches, with that limit written down.",
        added: "2026-09-18",
      },
    ],
    packet: {
      ...packet("review", false),
      history: [
        { at: "2026-09-04", status: "prepare", note: "Counselor prepared the packet.", by: "Senior counselor" },
        { at: "2026-10-02", status: "review", note: "CV date conflict flagged.", by: "U.S. physician" },
      ],
    },
    ecfmg: [
      { item: "MyIntealth account", owner: "Coordinator", checked: "2025-11-02", done: true },
      { item: "Credential verification", owner: "Coordinator", checked: "2026-01-20", done: true },
      { item: "Step 1", owner: "Counselor", checked: "2025-08-01", done: true },
      { item: "Step 2 CK", owner: "Counselor", checked: "2026-03-14", done: true },
      { item: "Pathway", owner: "Operations", checked: "2026-02-01", done: true },
      { item: "OET Medicine", owner: "Counselor", checked: "2026-01-11", done: true },
      { item: "Certification", owner: "Operations", checked: "2026-04-02", done: true },
      { item: "Match eligibility", owner: "Operations", checked: "2026-09-01", done: true },
    ],
    rotation: { site: "Community hospital, inpatient medicine", specialty: "Internal medicine", status: "Completed · 8 weeks" },
    lor: { physician: "Attending, inpatient medicine", status: "received" },
  },
];

export const seedEnquiries: Enquiry[] = [
  {
    id: "enq-ananya",
    name: "Ananya Rao",
    email: "ananya.rao@example.com",
    phone: "+91 98450 11021",
    school: "Osmania Medical College",
    country: "India",
    year: "3rd year",
    graduationYear: "2028",
    stepStatus: "Not started",
    specialty: "Undecided",
    source: "College senior",
    packageInterest: "A",
    message: "I want to know if this is even for me before I spend money on a course.",
    status: "closed",
    payment: { amount: 1800, method: "upi", date: "2026-09-12", packageId: "A" },
    studentId: "stu-ananya",
    createdAt: "2026-09-04",
  },
  {
    id: "enq-rohan",
    name: "Rohan Deshpande",
    email: "rohan.deshpande@example.com",
    phone: "+91 98220 44110",
    school: "BJ Medical College, Pune",
    country: "India",
    year: "2nd year",
    graduationYear: "2029",
    stepStatus: "Heard of Step 1 only",
    specialty: "Undecided",
    source: "Event waitlist",
    packageInterest: "A",
    message: "My parents want a timeline and a cost range before we book anything.",
    status: "new",
    createdAt: "2026-10-12",
  },
  {
    id: "enq-leela",
    name: "Leela Krishnan",
    email: "leela.krishnan@example.com",
    phone: "+91 94430 77821",
    school: "Madras Medical College",
    country: "India",
    year: "Final year",
    graduationYear: "2027",
    stepStatus: "Step 1 scheduled",
    specialty: "Pediatrics",
    source: "Resource article",
    packageInterest: "B",
    message: "I have a Step 1 date. I need a plan that includes what happens after the exam.",
    status: "contacted",
    createdAt: "2026-10-09",
  },
];

export const seedPrograms: Program[] = [
  {
    id: "prog-im-midwest",
    name: "Lakeshore Internal Medicine",
    specialty: "Internal medicine",
    location: "Midwest, United States",
    img: "Program page lists IMGs in recent classes. Verified on the program site.",
    visa: "J-1 noted on the program FAQ. H-1B not stated.",
    requirements: "Step 1 and Step 2 CK required. No attempt limit written on the page.",
    usce: "U.S. clinical experience preferred, not listed as mandatory.",
    research: "Not required on the public page.",
    preferences: "States an interest in applicants who will practice general medicine.",
    source: "Program website, GME page",
    verified: "2026-09-20",
  },
  {
    id: "prog-im-east",
    name: "Harborview Internal Medicine",
    specialty: "Internal medicine",
    location: "Northeast, United States",
    img: "IMG graduates appear in the resident roster. No percentage claimed.",
    visa: "J-1 sponsorship stated. H-1B not offered, per the FAQ.",
    requirements: "ECFMG certification before the rank deadline.",
    usce: "At least one U.S. inpatient rotation described as expected.",
    research: "Scholarly work welcomed. Not a cutoff on the page.",
    preferences: "Graduation within 5 years is mentioned. Confirm before relying on it.",
    source: "Program FAQ PDF",
    verified: "2026-09-18",
  },
  {
    id: "prog-neuro",
    name: "Northline Neurology",
    specialty: "Neurology",
    location: "South, United States",
    img: "No public statement that the program refuses IMGs. Roster not fully published.",
    visa: "Visa policy not on the page. Do not guess.",
    requirements: "Step 2 CK required. Step 1 pass required.",
    usce: "Neurology exposure preferred.",
    research: "Neurology poster or project described as helpful.",
    preferences: "Unverified comments from forums are not entered here.",
    source: "Program website",
    verified: "2026-08-30",
  },
];

export const seedDrafts: AiDraft[] = [
  {
    id: "draft-1",
    studentId: "stu-karthik",
    kind: "90-day plan",
    body: "Days 1–30: lock two Step 2 CK months and take one baseline self-assessment. Days 31–60: timed blocks, with every miss tagged as knowledge, misread, reasoning, timing, or careless. Days 61–90: choose the exam month and only then reopen the rotation conversation. This is a draft for staff. It is not a Match prediction and it does not go to the student until someone approves it.",
    status: "pending",
  },
  {
    id: "draft-2",
    studentId: "stu-fathima",
    kind: "Case brief",
    body: "Graduate, exams complete, eight weeks of inpatient medicine, one letter received. Packet is in senior review because two CV dates disagree. Recommended next step is student confirmation, not a new personal-statement rewrite.",
    status: "pending",
  },
];

export const seedMessages: ChatMessage[] = [
  {
    id: "msg-1",
    studentId: "stu-ananya",
    from: "staff",
    author: "Meera Iyer",
    body: "Friday’s block is the one that counts. Write the kind of miss, not the question.",
    at: "2026-10-14T09:20:00",
  },
  {
    id: "msg-2",
    studentId: "stu-karthik",
    from: "staff",
    author: "Meera Iyer",
    body: "Two candidate months, by Wednesday. Do not wait for a perfect practice score.",
    at: "2026-10-13T16:05:00",
  },
  {
    id: "msg-3",
    studentId: "stu-fathima",
    from: "staff",
    author: "Meera Iyer",
    body: "The packet is with the reviewer. You will only be asked to confirm the dates, not rewrite the statement.",
    at: "2026-10-12T11:40:00",
  },
];

export const seedActivities: ActivityNote[] = [
  {
    id: "act-1",
    studentId: "stu-ananya",
    tag: "study",
    author: "Meera Iyer",
    body: "Method practice only. No question bank inside the file.",
    at: "2026-10-08T18:00:00",
  },
  {
    id: "act-2",
    studentId: "stu-karthik",
    tag: "study",
    author: "Meera Iyer",
    body: "Last timed block ran out before the final six. Tagged as timing.",
    at: "2026-10-06T20:10:00",
  },
  {
    id: "act-3",
    studentId: "stu-fathima",
    tag: "application",
    author: "U.S. physician",
    body: "CV dates for the 2023 audit do not match the certificate. Held in review.",
    at: "2026-10-02T15:30:00",
  },
];

export const seedIncidents: Incident[] = [
  {
    id: "inc-1",
    at: "2026-09-18",
    summary: "A test enquiry used a sample address. No student document was opened.",
    status: "closed",
  },
];

export const seedVendors: Vendor[] = [
  { name: "Supabase", purpose: "Database, login, and files", data: "Student records and document names" },
  { name: "Host", purpose: "The website and the office", data: "Pages and session traffic" },
  { name: "Payment provider", purpose: "Package payments", data: "Name, amount, method, date" },
  { name: "AI provider", purpose: "Drafts a staff member asks for", data: "The prompt and the draft. Nothing is shown to a student until approved." },
];

export const seedState: DemoState = {
  enquiries: seedEnquiries,
  students: seedStudents,
  programs: seedPrograms,
  drafts: seedDrafts,
  accessLog: [],
  messages: seedMessages,
  activities: seedActivities,
  incidents: seedIncidents,
  vendors: seedVendors,
  articles,
  events,
  role: "counselor",
  actor: { kind: "student", studentId: "stu-ananya" },
};

export const DEMO_TODAY = "2026-10-15";

export function stageName(stage: Stage) {
  return stages.find((item) => item.id === stage)?.name ?? "Unknown";
}

export function isOverdue(deadline: string, today = "2026-10-15") {
  return deadline < today;
}

export function money(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
