"use client";

import Link from "next/link";
import { stageName } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export default function ReviewQueuePage() {
  const { state } = useDemo();
  const waiting = state.students.filter((student) => student.packet.status === "review" || student.packet.status === "confirm");
  const rest = state.students.filter((student) => !waiting.includes(student));

  return (
    <main>
      <h1 className="text-4xl">Application review</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Counselor prepares, a senior reviewer checks, the student confirms the facts, then it can be marked submitted. Nobody skips a step. The student never rewrites the packet from here.
      </p>
      <h2 className="mt-8 text-2xl">Reviewer queue</h2>
      <ul className="mt-3 grid gap-3">
        {waiting.length === 0 ? <li className="text-sm text-muted-foreground">Nothing is waiting on a reviewer.</li> : null}
        {waiting.map((student) => (
          <li key={student.id} className="flex flex-wrap items-center justify-between gap-3 border border-primary/40 bg-card/70 p-4">
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-muted-foreground">
                {student.packet.status === "review" ? "Waiting on a senior reviewer" : "Waiting on the student to confirm the facts"}
                {" · "}stage {student.stage} {stageName(student.stage)}
              </p>
            </div>
            <Link href={`/app/students/${student.id}`} className="text-sm text-primary underline-offset-4 hover:underline">
              Open packet
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-8 text-2xl">Other files</h2>
      <ul className="mt-3 grid gap-3">
        {rest.map((student) => (
          <li key={student.id} className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card/70 p-4">
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-muted-foreground">
                {student.packet.status} · stage {student.stage} {stageName(student.stage)}
              </p>
            </div>
            <Link href={`/app/students/${student.id}`} className="text-sm text-primary underline-offset-4 hover:underline">
              Open packet
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
