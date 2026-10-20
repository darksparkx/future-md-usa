"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { isOverdue, money, packages, stageName } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export default function OfficeStudentsPage() {
  const { state } = useDemo();

  return (
    <main>
      <h1 className="text-4xl">Students</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every enrolled file: counselor, package, payment, stage, and whether this week’s case conference should see them.
      </p>
      <ul className="mt-6 grid gap-3">
        {state.students.map((student) => {
          const pack = packages.find((item) => item.id === student.packageId);
          const late = isOverdue(student.nextAction.deadline);
          return (
            <li key={student.id}>
              <Link href={`/app/students/${student.id}`} className="block border border-border bg-card/80 p-4 hover:border-primary">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{student.name}</p>
                  <Badge variant={late ? "destructive" : "outline"}>
                    {late ? "Overdue" : "On time"} · Stage {student.stage} {stageName(student.stage)}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {student.counselor} · {pack?.name ?? `Package ${student.packageId}`}
                  {student.payment ? ` · paid ${money(student.payment.amount)} by ${student.payment.method} on ${student.payment.date} · balance ${money(student.payment.balance)}` : " · no payment on file"}
                </p>
                <p className="mt-2 text-sm">{student.nextAction.nextStep}</p>
                {student.caseConference ? <p className="mt-2 text-xs tracking-[0.14em] text-brass uppercase">Case conference</p> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
