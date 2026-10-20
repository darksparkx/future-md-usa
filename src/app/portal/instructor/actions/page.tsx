"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { dueLabel } from "@/components/student-portal";
import { isOverdue } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export default function InstructorActionsPage() {
  const { state } = useDemo();
  const students = state.students
    .slice()
    .sort((a, b) => Number(isOverdue(b.nextAction.deadline)) - Number(isOverdue(a.nextAction.deadline)));

  return (
    <main>
      <h1 className="text-4xl">Next actions</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every file needs a goal, a bottleneck, a next step, an owner, and a date. Overdue work sits at the top.
      </p>
      <ul className="mt-6 grid gap-3">
        {students.map((student) => {
          const late = isOverdue(student.nextAction.deadline);
          return (
            <li key={student.id} className="border border-border bg-card/80 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link href={`/portal/instructor/${student.id}`} className="font-medium text-primary underline-offset-4 hover:underline">
                  {student.name}
                </Link>
                <Badge variant={late ? "destructive" : "outline"}>{dueLabel(student.nextAction.deadline)}</Badge>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Goal</dt>
                  <dd className="mt-1">{student.nextAction.goal}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Bottleneck</dt>
                  <dd className="mt-1">{student.nextAction.bottleneck}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Next step</dt>
                  <dd className="mt-1">{student.nextAction.nextStep}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Owner</dt>
                  <dd className="mt-1">{student.nextAction.owner}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
