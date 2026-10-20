"use client";

import Link from "next/link";
import { formatDay, usePortalStudent } from "@/components/student-portal";
import type { MistakeTag } from "@/data/demo";
import { useSiteOption } from "@/lib/site-option";

const tags: MistakeTag[] = ["Knowledge gap", "Misreading", "Reasoning error", "Timing issue", "Careless error"];

export default function StudyPage() {
  const { student } = usePortalStudent();
  const { option } = useSiteOption();
  if (!student) return null;

  if (option !== 3) {
    return (
      <main className="max-w-xl">
        <h1 className="text-3xl">Study stays with your quarter list</h1>
        <p className="mt-3 text-muted-foreground">
          This account shows your stage, the next action, and the ninety-day list. The study record, mistake tags, and exam notes are part of the full office.
        </p>
        <Link href="/portal/student/quarter" className="mt-4 inline-block text-sm text-primary underline-offset-4 hover:underline">
          Back to this quarter
        </Link>
      </main>
    );
  }

  const counts = tags.map((tag) => ({ tag, count: student.study.sessions.filter((session) => session.tag === tag).length }));

  return (
    <main className="grid max-w-2xl gap-8">
      <header>
        <h1 className="text-3xl">Study record</h1>
        <p className="mt-2 text-muted-foreground">
          Your counselor writes this. You can read it. The question bank stays outside, and nothing here is a Match chance.
        </p>
      </header>
      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Where you are</dt>
          <dd>{student.study.level}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Hours</dt>
          <dd>{student.study.studyTime}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Exam date</dt>
          <dd>{student.study.examDate}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Attempts</dt>
          <dd>{student.study.attempts}</dd>
        </div>
      </dl>
      <section className="grid gap-2 text-sm">
        <h2 className="text-xl">Question-bank notes</h2>
        <p>{student.study.uworldNotes}</p>
        <h2 className="mt-4 text-xl">Self-assessment</h2>
        <p>{student.study.selfAssessment}</p>
        <h2 className="mt-4 text-xl">Weak spots</h2>
        <p>{student.study.weakSubjects}</p>
      </section>
      <section>
        <h2 className="text-xl">Mistake summary</h2>
        <ul className="mt-3 flex flex-wrap gap-3 text-sm">
          {counts.map((entry) => (
            <li key={entry.tag} className="border border-border px-3 py-2">{entry.tag}: {entry.count}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl">Session notes</h2>
        {student.study.sessions.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No notes yet.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {student.study.sessions.map((session) => (
              <li key={session.id} className="border border-border px-4 py-3 text-sm">
                <p className="text-xs tracking-[0.14em] text-primary uppercase">{formatDay(session.date)} · {session.tag}</p>
                <p className="mt-2">{session.note}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
