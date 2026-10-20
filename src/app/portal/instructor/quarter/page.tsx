"use client";

import Link from "next/link";
import { quarterProgress, stageTitle } from "@/components/student-portal";
import { useDemo } from "@/lib/demo-store";

export default function InstructorQuarterPage() {
  const { state, toggleCheck } = useDemo();

  return (
    <main>
      <h1 className="text-4xl">This quarter</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        The ninety-day list, the milestone, and what is already in place. The longer roadmap stays on the student file.
      </p>
      <div className="mt-6 grid gap-6">
        {state.students.map((student) => {
          const progress = quarterProgress(student);
          return (
            <section key={student.id} className="border border-border bg-card/80 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Link href={`/portal/instructor/${student.id}`} className="text-xl text-primary underline-offset-4 hover:underline">
                  {student.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {stageTitle(student.stage)} · {progress.done} of {progress.total} done
                </p>
              </div>
              <p className="mt-3 text-sm">
                <span className="text-muted-foreground">Milestone. </span>
                {student.milestone}
              </p>
              <ul className="mt-4 grid gap-2">
                {student.checklist.map((item) => (
                  <li key={item.id}>
                    <label className="flex items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={item.done}
                        onChange={() => toggleCheck(student.id, item.id)}
                      />
                      <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-muted-foreground">Already in place. </span>
                  {student.strengths.join(" · ") || "Nothing written down yet."}
                </p>
                <p>
                  <span className="text-muted-foreground">Still open. </span>
                  {student.gaps.join(" · ") || "Nothing written down yet."}
                </p>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
