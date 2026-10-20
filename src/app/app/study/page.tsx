"use client";

import Link from "next/link";
import type { MistakeTag } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

const tags: MistakeTag[] = ["Knowledge gap", "Misreading", "Reasoning error", "Timing issue", "Careless error"];

export default function OfficeStudyPage() {
  const { state } = useDemo();

  return (
    <main>
      <h1 className="text-4xl">Study tracker</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Staff keep the plan. Students can read it. Sessions are tagged by the kind of miss. This does not store questions and it does not connect to a question bank.
      </p>
      <ul className="mt-6 grid gap-4">
        {state.students.map((student) => {
          const counts = tags.map((tag) => student.study.sessions.filter((session) => session.tag === tag).length);
          return (
            <li key={student.id} className="border border-border bg-card/80 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl">{student.name}</h2>
                <Link href={`/app/students/${student.id}`} className="text-sm text-primary underline-offset-4 hover:underline">
                  Edit the plan
                </Link>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {student.study.level} · {student.study.studyTime} · exam {student.study.examDate}
              </p>
              <p className="mt-2 text-sm">{student.study.uworldNotes}</p>
              <p className="mt-2 text-sm text-muted-foreground">Weak spots: {student.study.weakSubjects}</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-xs">
                {tags.map((tag, index) => (
                  <li key={tag} className="border border-border px-2 py-1">{tag}: {counts[index]}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
