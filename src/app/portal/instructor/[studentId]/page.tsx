"use client";

import Link from "next/link";
import { Suspense, use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, controlClass } from "@/components/page-title";
import { stageName, stages, type NextAction, type Stage } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export default function InstructorStudentPage({ params }: { params: Promise<{ studentId: string }> }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading the file…</p>}>
      <InstructorFile params={params} />
    </Suspense>
  );
}

function InstructorFile({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = use(params);
  return <FileBody studentId={studentId} />;
}

function FileBody({ studentId }: { studentId: string }) {
  const { state, saveNextAction, changeStage, updateStudent } = useDemo();
  const student = state.students.find((item) => item.id === studentId);
  const [action, setAction] = useState<NextAction | null>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [notes, setNotes] = useState<string | null>(null);

  if (!student) return <p>That student is not in the preview.</p>;
  const draft = action ?? student.nextAction;
  const nextStage = stage ?? student.stage;

  return (
    <main className="grid gap-8">
      <div>
        <Link href="/portal/instructor" className="text-sm text-primary underline-offset-4 hover:underline">All students</Link>
        <h1 className="mt-3 text-4xl">{student.name}</h1>
        <p className="mt-2 text-muted-foreground">{student.school} · package {student.packageId} · {student.counselor}</p>
      </div>

      <section className="grid gap-2 md:grid-cols-2">
        <div>
          <h2 className="text-xl">Stage {student.stage} · {stageName(student.stage)}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{student.stageReason}</p>
        </div>
        <div className="text-sm">
          <p className="font-medium">Strengths</p>
          <p className="text-muted-foreground">{student.strengths.join(" · ") || "None recorded"}</p>
          <p className="mt-3 font-medium">Gaps</p>
          <p className="text-muted-foreground">{student.gaps.join(" · ") || "None recorded"}</p>
        </div>
      </section>

      <section className="border border-border bg-card/80 p-4">
        <h2 className="text-xl">Next action</h2>
        <p className="mt-1 text-sm text-muted-foreground">Goal, bottleneck, next step, owner, and deadline are all required.</p>
        <form
          className="mt-4 grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const saved = saveNextAction(student.id, draft);
            setError(saved ? "" : "Fill every field before saving.");
          }}
        >
          <Field label="Goal">
            <Input className="h-10" value={draft.goal} onChange={(event) => setAction({ ...draft, goal: event.target.value })} />
          </Field>
          <Field label="Bottleneck">
            <Input className="h-10" value={draft.bottleneck} onChange={(event) => setAction({ ...draft, bottleneck: event.target.value })} />
          </Field>
          <Field label="Next step">
            <Textarea value={draft.nextStep} onChange={(event) => setAction({ ...draft, nextStep: event.target.value })} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Owner">
              <Input className="h-10" value={draft.owner} onChange={(event) => setAction({ ...draft, owner: event.target.value })} />
            </Field>
            <Field label="Deadline">
              <Input className="h-10" type="date" value={draft.deadline} onChange={(event) => setAction({ ...draft, deadline: event.target.value })} />
            </Field>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="h-10 w-fit">Save next action</Button>
        </form>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl">Change stage</h2>
        <Field label="Stage">
          <select className={controlClass} value={nextStage} onChange={(event) => setStage(Number(event.target.value) as Stage)}>
            {stages.map((item) => (
              <option key={item.id} value={item.id}>{item.id} · {item.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Reason">
          <Textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why this stage is the honest one" />
        </Field>
        <Button
          variant="outline"
          className="h-10 w-fit"
          onClick={() => {
            const ok = changeStage(student.id, nextStage, reason);
            setError(ok ? "" : "A stage change needs a written reason.");
            if (ok) setReason("");
          }}
        >
          Save stage
        </Button>
      </section>

      <section>
        <h2 className="text-xl">Notes</h2>
        <Textarea className="mt-3" value={notes ?? student.notes} onChange={(event) => setNotes(event.target.value)} />
        <Button className="mt-3 h-10" variant="secondary" onClick={() => updateStudent(student.id, { notes: notes ?? student.notes })}>
          Save notes
        </Button>
      </section>
    </main>
  );
}
