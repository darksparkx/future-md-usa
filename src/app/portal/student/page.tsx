"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dueLabel, formatDay, quarterProgress, stageFocus, stageTitle, usePortalStudent } from "@/components/student-portal";
import { isOverdue, packages, type ItemStatus, type PacketStatus } from "@/data/demo";
import { useSiteOption } from "@/lib/site-option";

const packetCopy: Record<PacketStatus, string> = {
  prepare: "Your team is still putting the packet together.",
  review: "A reviewer has the packet. You confirm the facts only after it is sent back to you.",
  confirm: "Read the dates and statements. You are confirming them, not rewriting the application.",
  submitted: "The packet has been submitted.",
};

const itemCopy: Record<ItemStatus, string> = {
  missing: "Still needed",
  attached: "In the packet",
  reviewed: "Reviewed",
};

export default function StudentHomePage() {
  const { state, student, confirmPacket } = usePortalStudent();
  const { option } = useSiteOption();
  const full = option === 3;
  if (!student) return null;

  const stage = stageFocus(student.stage);
  const progress = quarterProgress(student);
  const late = isOverdue(student.nextAction.deadline);
  const waiting = student.documents.filter((doc) => !doc.uploadedAt);
  const pack = packages.find((item) => item.id === student.packageId);
  const approved = state.drafts.filter((draft) => draft.studentId === student.id && draft.status === "approved");
  const showApplication = full && (student.stage >= 4 || student.packet.status !== "prepare" || student.shortlist.length > 0);
  const showRotation = full && student.rotation.site !== "Not planned" && student.rotation.status !== "Too early";
  const showLetter = full && student.lor.status !== "not-started";

  return (
    <main className="grid gap-8">
      <header>
        <p className="text-xs tracking-[0.18em] text-primary uppercase">Student</p>
        <h1 className="mt-2 text-4xl">{student.name}</h1>
        <p className="mt-2 text-muted-foreground">
          {student.school} · {student.year}
          {pack ? ` · ${pack.name}` : ""}
        </p>
      </header>

      <section className="grid gap-2 border-t border-border pt-6">
        <p className="text-xs tracking-[0.16em] uppercase text-brass">{stageTitle(student.stage)}</p>
        <h2 className="text-2xl">{stage?.student}</h2>
        <p className="max-w-2xl text-muted-foreground">{stage?.focus}</p>
        <p className="text-sm">{student.updates}</p>
      </section>

      <section className={`border p-5 ${late ? "border-destructive bg-destructive/5" : "border-border bg-card/80"}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl">Next action</h2>
          <Badge variant={late ? "destructive" : "outline"}>{dueLabel(student.nextAction.deadline)}</Badge>
        </div>
        <p className="mt-3">{student.nextAction.nextStep}</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Aim</dt>
            <dd>{student.nextAction.goal}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">What is in the way</dt>
            <dd>{student.nextAction.bottleneck}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Who does it</dt>
            <dd>{student.nextAction.owner}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Milestone</dt>
            <dd>{student.milestone}</dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Link href="/portal/student/quarter" className="border border-border p-4 hover:border-primary">
          <h2 className="text-lg">This quarter</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {progress.total === 0
              ? "No list yet."
              : progress.done === progress.total
                ? "The list for these ninety days is done."
                : `${progress.done} of ${progress.total} done.`}
          </p>
        </Link>
        {full ? (
          <Link href="/portal/student/study" className="border border-border p-4 hover:border-primary">
            <h2 className="text-lg">Study</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {student.study.level}. Exam {student.study.examDate.toLowerCase()}.
            </p>
          </Link>
        ) : null}
        <Link href="/portal/student/documents" className="border border-border p-4 hover:border-primary">
          <h2 className="text-lg">Documents</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {waiting.length === 0 ? "Nothing is waiting on you." : `${waiting.length} still needed.`}
          </p>
        </Link>
      </section>

      {showRotation || showLetter ? (
        <section className="grid gap-3 text-sm sm:grid-cols-2">
          {showRotation ? (
            <div>
              <h2 className="text-xl">Clinical time</h2>
              <p className="mt-2">{student.rotation.site}</p>
              <p className="text-muted-foreground">{student.rotation.specialty} · {student.rotation.status}</p>
            </div>
          ) : null}
          {showLetter ? (
            <div>
              <h2 className="text-xl">Letter</h2>
              <p className="mt-2">{student.lor.physician}</p>
              <p className="text-muted-foreground">
                {student.lor.status === "received"
                  ? "Received. A letter is written only after the physician has seen the work."
                  : student.lor.status === "requested"
                    ? "Requested. A request is not a promise."
                    : "The physician declined."}
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      {showApplication ? (
        <section className="border border-border p-5">
          <h2 className="text-xl">Application</h2>
          <p className="mt-2 text-sm text-muted-foreground">{packetCopy[student.packet.status]}</p>
          {student.packet.submittedAt ? (
            <p className="mt-2 text-sm">Submitted {formatDay(student.packet.submittedAt)}.</p>
          ) : null}
          <ul className="mt-4 grid gap-2 text-sm">
            {student.packet.items.map((item) => (
              <li key={item.id} className="flex flex-wrap justify-between gap-2 border-b border-border/70 py-2">
                <span>{item.name}</span>
                <span className="text-muted-foreground">{itemCopy[item.status]}</span>
              </li>
            ))}
          </ul>
          {student.packet.history.length ? (
            <ol className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {student.packet.history.map((entry) => (
                <li key={`${entry.at}-${entry.note}`}>
                  {formatDay(entry.at)} — {entry.note}
                </li>
              ))}
            </ol>
          ) : null}
          {student.packet.status === "confirm" ? (
            student.packet.studentConfirmed ? (
              <p className="mt-4 text-sm">You confirmed these facts. Staff can mark the packet submitted.</p>
            ) : (
              <Button className="mt-4 h-10" onClick={() => confirmPacket(student.id)}>
                These facts are correct
              </Button>
            )
          ) : null}
        </section>
      ) : null}

      {full && student.shortlist.length ? (
        <section>
          <h2 className="text-xl">Programs your team is considering</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fit notes from your team. There is no score and no Match chance on this list.</p>
          <ol className="mt-4 grid gap-3">
            {student.shortlist
              .slice()
              .sort((a, b) => a.rank - b.rank)
              .map((item) => {
                const program = state.programs.find((entry) => entry.id === item.programId);
                return (
                  <li key={item.programId} className="border border-border p-4 text-sm">
                    <p className="font-medium">
                      {item.rank}. {program?.name ?? "Program removed from this file"}
                    </p>
                    {program ? (
                      <p className="mt-1 text-muted-foreground">
                        {program.specialty} · {program.location} · checked {formatDay(program.verified)}
                      </p>
                    ) : null}
                    <p className="mt-2">{item.note}</p>
                  </li>
                );
              })}
          </ol>
        </section>
      ) : null}

      {full && approved.length ? (
        <section>
          <h2 className="text-xl">Notes approved for you</h2>
          {approved.map((draft) => (
            <article key={draft.id} className="mt-3 border border-border p-4 text-sm leading-relaxed">
              <p className="text-xs tracking-[0.14em] text-primary uppercase">{draft.kind}</p>
              <p className="mt-2">{draft.body}</p>
            </article>
          ))}
        </section>
      ) : null}

      <p className="text-sm text-muted-foreground">
        Your counselor is {student.counselor}. Messages stay on WhatsApp. This portal does not have a chat.
      </p>
    </main>
  );
}
