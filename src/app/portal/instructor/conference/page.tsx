"use client";

import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { stageTitle } from "@/components/student-portal";
import { useDemo } from "@/lib/demo-store";

export default function InstructorConferencePage() {
  const { state, updateStudent } = useDemo();
  const students = state.students.slice().sort((a, b) => Number(b.caseConference) - Number(a.caseConference));
  const flagged = students.filter((student) => student.caseConference).length;

  return (
    <main>
      <h1 className="text-4xl">Case conference</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Flag a file for the weekly meeting and write why. {flagged ? `${flagged} flagged this week.` : "Nothing is flagged this week."}
      </p>
      <ul className="mt-6 grid gap-4">
        {students.map((student) => (
          <li key={student.id} className="border border-border bg-card/80 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link href={`/portal/instructor/${student.id}`} className="font-medium text-primary underline-offset-4 hover:underline">
                {student.name}
              </Link>
              <p className="text-sm text-muted-foreground">{stageTitle(student.stage)}</p>
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={student.caseConference}
                onChange={(event) => updateStudent(student.id, { caseConference: event.target.checked })}
              />
              Bring this file to case conference
            </label>
            <Textarea
              className="mt-3"
              placeholder="Why this file needs the meeting"
              defaultValue={student.caseNotes}
              key={`${student.id}-${student.caseNotes}`}
              onBlur={(event) => {
                if (event.target.value !== student.caseNotes) updateStudent(student.id, { caseNotes: event.target.value });
              }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
