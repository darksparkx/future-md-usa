"use client";

import Link from "next/link";
import { formatDay } from "@/components/student-portal";
import { useDemo } from "@/lib/demo-store";

export default function InstructorDocumentsPage() {
  const { state } = useDemo();

  return (
    <main>
      <h1 className="text-4xl">Documents</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        What is still needed, and what has already been received. The file stays on the student’s computer. This list only records the name and the date.
      </p>
      <div className="mt-6 grid gap-4">
        {state.students.map((student) => {
          const waiting = student.documents.filter((item) => !item.uploadedAt);
          const received = student.documents.filter((item) => item.uploadedAt);
          return (
            <section key={student.id} className="border border-border bg-card/80 p-4">
              <Link href={`/portal/instructor/${student.id}`} className="font-medium text-primary underline-offset-4 hover:underline">
                {student.name}
              </Link>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-medium">Still needed</h2>
                  {waiting.length ? (
                    <ul className="mt-2 grid gap-1 text-sm">
                      {waiting.map((item) => (
                        <li key={item.id}>{item.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">Nothing waiting.</p>
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-medium">Received</h2>
                  {received.length ? (
                    <ul className="mt-2 grid gap-1 text-sm">
                      {received.map((item) => (
                        <li key={item.id}>
                          {item.name}
                          <span className="text-muted-foreground"> · {formatDay(item.uploadedAt ?? "")}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-muted-foreground">Nothing received yet.</p>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
