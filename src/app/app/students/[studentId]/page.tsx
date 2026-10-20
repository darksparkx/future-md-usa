"use client";

import Link from "next/link";
import { Suspense, use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { menuListClass, menuTriggerClass } from "@/components/menu-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, controlClass } from "@/components/page-title";
import {
  stageName,
  type ItemStatus,
  type LorStatus,
  type MistakeTag,
  type StudyPlan,
} from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

const tags: MistakeTag[] = ["Knowledge gap", "Misreading", "Reasoning error", "Timing issue", "Careless error"];

export default function OfficeStudentPage({ params }: { params: Promise<{ studentId: string }> }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading the file…</p>}>
      <OfficeStudent params={params} />
    </Suspense>
  );
}

function OfficeStudent({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = use(params);
  const demo = useDemo();
  const student = demo.state.students.find((item) => item.id === studentId);

  useEffect(() => {
    demo.logAccess(studentId, "Opened student file");
  }, [studentId, demo]);

  if (!student) return <p>Student not in this preview.</p>;

  return (
    <main>
      <p className="text-sm text-muted-foreground">
        <Link href="/app/pipeline" className="text-primary underline-offset-4 hover:underline">Pipeline</Link>
        {" · "}Stage {student.stage} {stageName(student.stage)} · {student.counselor}
      </p>
      <h1 className="mt-2 text-4xl">{student.name}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {student.school} · {student.year} · grad {student.graduationYear} · package {student.packageId}
        {student.payment ? ` · paid ${student.payment.method} ${student.payment.date} · balance ${student.payment.balance}` : ""}
      </p>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={student.caseConference}
          onChange={(event) => demo.updateStudent(student.id, { caseConference: event.target.checked })}
        />
        Flag for the weekly case conference
      </label>
      <Textarea
        className="mt-2"
        placeholder="Case conference notes"
        defaultValue={student.caseNotes}
        onBlur={(event) => demo.updateStudent(student.id, { caseNotes: event.target.value })}
      />

      <Tabs defaultValue="assessment" className="mt-8">
        <div className="border-b border-border">
          <TabsList className={menuListClass}>
            <TabsTrigger value="assessment" className={menuTriggerClass}>Assessment</TabsTrigger>
            <TabsTrigger value="study" className={menuTriggerClass}>Study tracker</TabsTrigger>
            <TabsTrigger value="shortlist" className={menuTriggerClass}>Shortlist</TabsTrigger>
            <TabsTrigger value="packet" className={menuTriggerClass}>Application review</TabsTrigger>
            <TabsTrigger value="ecfmg" className={menuTriggerClass}>ECFMG & letters</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="assessment" className="mt-4">
          <AssessmentForm studentId={student.id} />
        </TabsContent>
        <TabsContent value="study" className="mt-4">
          <StudyForm studentId={student.id} />
        </TabsContent>
        <TabsContent value="shortlist" className="mt-4">
          <ShortlistForm studentId={student.id} />
        </TabsContent>
        <TabsContent value="packet" className="mt-4">
          <PacketForm studentId={student.id} />
        </TabsContent>
        <TabsContent value="ecfmg" className="mt-4">
          <EcfmgForm studentId={student.id} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function AssessmentForm({ studentId }: { studentId: string }) {
  const { state, saveAssessment } = useDemo();
  const student = state.students.find((item) => item.id === studentId)!;
  const [draft, setDraft] = useState(student.assessment);
  const fields = [
    ["academic", "Academic"],
    ["career", "Career"],
    ["clinical", "Clinical"],
    ["research", "Research"],
    ["admin", "Administrative — ECFMG, credentials, pathway, OET, visa"],
    ["personal", "Personal — budget, timeline, geography, family"],
  ] as const;

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        saveAssessment(student.id, draft);
      }}
    >
      {fields.map(([key, label]) => (
        <Field key={key} label={label}>
          <Textarea value={draft[key]} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} />
        </Field>
      ))}
      <Button type="submit" className="h-10 w-fit">Save assessment</Button>
    </form>
  );
}

function StudyForm({ studentId }: { studentId: string }) {
  const { state, saveStudy, addSession } = useDemo();
  const student = state.students.find((item) => item.id === studentId)!;
  const [plan, setPlan] = useState<StudyPlan>(student.study);
  const [note, setNote] = useState("");
  const [tag, setTag] = useState<MistakeTag>("Knowledge gap");
  const counts = tags.map((item) => ({ item, count: student.study.sessions.filter((session) => session.tag === item).length }));

  function set<K extends keyof StudyPlan>(key: K, value: StudyPlan[K]) {
    setPlan((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        Staff type the plan and the numbers. This is not a question bank and it does not pull UWorld content.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Year or level"><Input className="h-10" value={plan.level} onChange={(event) => set("level", event.target.value)} /></Field>
        <Field label="Study time"><Input className="h-10" value={plan.studyTime} onChange={(event) => set("studyTime", event.target.value)} /></Field>
        <Field label="Target exam date"><Input className="h-10" value={plan.examDate} onChange={(event) => set("examDate", event.target.value)} /></Field>
        <Field label="Past attempts"><Input className="h-10" value={plan.attempts} onChange={(event) => set("attempts", event.target.value)} /></Field>
      </div>
      <Field label="UWorld progress notes"><Textarea value={plan.uworldNotes} onChange={(event) => set("uworldNotes", event.target.value)} /></Field>
      <Field label="Self-assessment results"><Textarea value={plan.selfAssessment} onChange={(event) => set("selfAssessment", event.target.value)} /></Field>
      <Field label="Weak subjects"><Textarea value={plan.weakSubjects} onChange={(event) => set("weakSubjects", event.target.value)} /></Field>
      <Button className="h-10 w-fit" onClick={() => saveStudy(student.id, { ...plan, sessions: student.study.sessions })}>Save plan</Button>
      <div className="grid gap-2 border-t border-border pt-4">
        <h2 className="text-xl">Mistake tags</h2>
        <p className="text-sm text-muted-foreground">Tags only. Do not paste question text.</p>
        <div className="flex flex-wrap gap-3 text-sm">
          {counts.map((entry) => (
            <span key={entry.item}>{entry.item}: {entry.count}</span>
          ))}
        </div>
        <Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="What kind of miss, in one line" />
        <select className={controlClass} value={tag} onChange={(event) => setTag(event.target.value as MistakeTag)}>
          {tags.map((item) => <option key={item}>{item}</option>)}
        </select>
        <Button
          variant="outline"
          className="h-10 w-fit"
          onClick={() => {
            if (!note.trim()) return;
            addSession(student.id, { id: `ses-${Date.now()}`, date: new Date().toISOString().slice(0, 10), note: note.trim(), tag });
            setNote("");
          }}
        >
          Add session note
        </Button>
        <ul className="grid gap-2 text-sm">
          {student.study.sessions.map((session) => (
            <li key={session.id}>{session.date} · {session.tag} · {session.note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ShortlistForm({ studentId }: { studentId: string }) {
  const { state, addShortlist, moveShortlist, removeShortlist } = useDemo();
  const student = state.students.find((item) => item.id === studentId)!;
  const [specialty, setSpecialty] = useState("All");
  const [note, setNote] = useState("");
  const [picked, setPicked] = useState(state.programs[0]?.id ?? "");
  const canEdit = state.role !== "coordinator";
  const specialties = ["All", ...new Set(state.programs.map((program) => program.specialty))];
  const visible = state.programs.filter((program) => specialty === "All" || program.specialty === specialty);
  const ranked = student.shortlist.slice().sort((a, b) => a.rank - b.rank);

  return (
    <div className="grid gap-4">
      <p className="border border-brass/50 bg-card px-3 py-2 text-sm">
        Decision support for the team. This shortlist does not score programs and it does not predict a Match.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Filter">
          <select className={controlClass} value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
            {specialties.map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Program">
          <select className={controlClass} value={picked} onChange={(event) => setPicked(event.target.value)}>
            {visible.map((program) => <option key={program.id} value={program.id}>{program.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Why this program">
        <Textarea value={note} onChange={(event) => setNote(event.target.value)} />
      </Field>
      {canEdit ? (
        <Button className="h-10 w-fit" onClick={() => { addShortlist(student.id, picked, note); setNote(""); }}>
          Add to shortlist
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">Coordinators can read the list. Editing sits with counseling and the U.S. physician.</p>
      )}
      <ol className="grid gap-3">
        {ranked.length === 0 ? <li className="text-sm text-muted-foreground">No programs on this file.</li> : null}
        {ranked.map((item) => {
          const program = state.programs.find((entry) => entry.id === item.programId);
          return (
            <li key={item.programId} className="border border-border p-3 text-sm">
              <p className="font-medium">{item.rank}. {program?.name}</p>
              <p className="text-muted-foreground">{program?.specialty} · {program?.location} · checked {program?.verified}</p>
              <p className="mt-1">{item.note}</p>
              <p className="mt-1 text-xs text-muted-foreground">Added {item.added} · source: {program?.source}</p>
              {canEdit ? (
                <div className="mt-2 flex gap-3">
                  <button type="button" className="text-primary" onClick={() => moveShortlist(student.id, item.programId, -1)}>Up</button>
                  <button type="button" className="text-primary" onClick={() => moveShortlist(student.id, item.programId, 1)}>Down</button>
                  <button type="button" className="text-destructive" onClick={() => removeShortlist(student.id, item.programId)}>Remove</button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PacketForm({ studentId }: { studentId: string }) {
  const { state, advancePacket, reopenPacket, setItemStatus } = useDemo();
  const student = state.students.find((item) => item.id === studentId)!;
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="grid gap-4">
      <p className="text-sm">Status: {student.packet.status}{student.packet.studentConfirmed ? " · student confirmed" : ""}{student.packet.submittedAt ? ` · submitted ${student.packet.submittedAt}` : ""}</p>
      <ul className="grid gap-2">
        {student.packet.items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span>{item.name}</span>
            <select
              className="h-9 rounded-lg border border-input bg-card px-2"
              value={item.status}
              onChange={(event) => setItemStatus(student.id, item.id, event.target.value as ItemStatus)}
            >
              <option value="missing">missing</option>
              <option value="attached">attached</option>
              <option value="reviewed">reviewed</option>
            </select>
          </li>
        ))}
      </ul>
      <Field label="Note for the next step">
        <Textarea value={note} onChange={(event) => setNote(event.target.value)} />
      </Field>
      <Button
        className="h-10 w-fit"
        onClick={() => {
          const result = advancePacket(student.id, note);
          setError(result ?? "");
          if (!result) setNote("");
        }}
      >
        Advance one step
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <ol className="grid gap-1 text-sm text-muted-foreground">
        {student.packet.history.map((entry) => (
          <li key={`${entry.at}-${entry.note}`}>{entry.at} · {entry.status} · {entry.by} · {entry.note}</li>
        ))}
      </ol>
      {state.role === "ops" ? (
        <div className="grid gap-2 border-t border-border pt-4">
          <Field label="Reopen reason">
            <Input className="h-10" value={reason} onChange={(event) => setReason(event.target.value)} />
          </Field>
          <Button variant="outline" className="h-10 w-fit" onClick={() => setError(reopenPacket(student.id, reason) ? "" : "Operations needs a written reason.")}>
            Reopen packet
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function EcfmgForm({ studentId }: { studentId: string }) {
  const { state, updateStudent } = useDemo();
  const student = state.students.find((item) => item.id === studentId)!;

  return (
    <div className="grid gap-6">
      <ul className="grid gap-2">
        {student.ecfmg.map((item, index) => (
          <li key={item.item} className="flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.done}
                onChange={(event) => {
                  const ecfmg = student.ecfmg.map((row, rowIndex) => rowIndex === index ? { ...row, done: event.target.checked, checked: new Date().toISOString().slice(0, 10) } : row);
                  updateStudent(student.id, { ecfmg });
                }}
              />
              {item.item}
            </label>
            <span className="text-muted-foreground">{item.owner} · {item.checked}</span>
          </li>
        ))}
      </ul>
      <div className="grid gap-2 text-sm">
        <p>Rotation: {student.rotation.site} · {student.rotation.specialty} · {student.rotation.status}</p>
        <Field label="Letter status">
          <select
            className={controlClass}
            value={student.lor.status}
            onChange={(event) => updateStudent(student.id, { lor: { ...student.lor, status: event.target.value as LorStatus } })}
          >
            <option value="not-started">not started</option>
            <option value="requested">requested</option>
            <option value="received">received</option>
            <option value="declined">declined</option>
          </select>
        </Field>
        <p className="text-muted-foreground">A letter is never a guarantee. Declined is a real status.</p>
      </div>
    </div>
  );
}
