"use client";

import Link from "next/link";
import { isOverdue, money, stageName } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export default function OfficeHomePage() {
  const { state } = useDemo();
  const revenue = state.enquiries.reduce((sum, enquiry) => sum + (enquiry.payment?.amount ?? 0), 0);
  const overdue = state.students.filter((student) => isOverdue(student.nextAction.deadline));
  const figures = [
    ["Active students", String(state.students.length)],
    ["Revenue", money(revenue)],
    ["New enquiries", String(state.enquiries.filter((item) => item.status === "new").length)],
    ["Overdue tasks", String(overdue.length)],
    ["Past Step 1 stage", String(state.students.filter((student) => student.stage >= 3).length)],
    ["USCE completed", String(state.students.filter((student) => student.rotation.status.toLowerCase().includes("completed")).length)],
    ["Applications submitted", String(state.students.filter((student) => student.packet.status === "submitted").length)],
    ["Interviews", "0"],
    ["Match", "0"],
  ];

  return (
    <main>
      <h1 className="text-4xl">Office</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        The student and instructor portals stay. This is the layer around them: the pipeline, the three working tools, messages, and the privacy log. Interviews and Match stay at zero until the cohort reaches them. There is no probability on this screen.
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <Link href="/app/review" className="border border-border bg-card/80 p-4 hover:border-primary">
          <h2 className="text-xl">Application review</h2>
          <p className="mt-2 text-sm text-muted-foreground">Prepare, review, student confirmation, then submit. A step cannot be skipped.</p>
        </Link>
        <Link href="/app/study" className="border border-border bg-card/80 p-4 hover:border-primary">
          <h2 className="text-xl">Study tracker</h2>
          <p className="mt-2 text-sm text-muted-foreground">Plans, exam dates, and mistake tags. Not a question bank.</p>
        </Link>
        <Link href="/app/programs" className="border border-border bg-card/80 p-4 hover:border-primary">
          <h2 className="text-xl">Program list</h2>
          <p className="mt-2 text-sm text-muted-foreground">A private database. Shortlists are ranked notes, not scores.</p>
        </Link>
      </div>
      <dl className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {figures.map(([label, value]) => (
          <div key={label} className="border border-border bg-card/70 p-4">
            <dt className="text-xs tracking-[0.12em] text-muted-foreground uppercase">{label}</dt>
            <dd className="mt-2 font-heading text-2xl">{value}</dd>
          </div>
        ))}
      </dl>
      <section className="mt-10">
        <h2 className="text-2xl">Overdue</h2>
        {overdue.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nothing overdue.</p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {overdue.map((student) => (
              <li key={student.id}>
                <Link href={`/app/students/${student.id}`} className="text-sm text-primary underline-offset-4 hover:underline">
                  {student.name} · stage {student.stage} {stageName(student.stage)} · due {student.nextAction.deadline}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <p className="mt-10 text-sm text-muted-foreground">
        <Link href="/app/privacy" className="text-primary underline-offset-4 hover:underline">Privacy desk</Link>
        {" "}holds retention, vendors, incidents, and the U.S. access trail.
      </p>
    </main>
  );
}
