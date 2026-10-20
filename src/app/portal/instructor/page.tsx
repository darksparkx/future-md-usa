"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { isOverdue, stageName } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export default function InstructorHomePage() {
  const { state } = useDemo();
  const overdue = state.students.filter((student) => isOverdue(student.nextAction.deadline));

  return (
    <main>
      <h1 className="text-4xl">Instructor</h1>
      <p className="mt-2 text-muted-foreground">Overdue next actions sit at the top. Open a file to write the next step.</p>
      {overdue.length ? (
        <p className="mt-4 text-sm text-destructive">{overdue.length} overdue</p>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No overdue actions.</p>
      )}
      <ul className="mt-6 grid gap-3">
        {state.students
          .slice()
          .sort((a, b) => Number(isOverdue(b.nextAction.deadline)) - Number(isOverdue(a.nextAction.deadline)))
          .map((student) => {
            const late = isOverdue(student.nextAction.deadline);
            return (
              <li key={student.id}>
                <Link href={`/portal/instructor/${student.id}`} className="block border border-border bg-card/80 p-4 hover:border-primary">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{student.name}</p>
                    <Badge variant={late ? "destructive" : "outline"}>
                      {late ? "Overdue" : "On time"} · Stage {student.stage} {stageName(student.stage)}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm">{student.nextAction.nextStep}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Due {student.nextAction.deadline} · {student.counselor}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
