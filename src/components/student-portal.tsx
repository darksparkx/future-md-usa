"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuBar } from "@/components/menu-bar";
import { isOverdue, stageName, stages, type Stage, type Student } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";
import { useSiteOption } from "@/lib/site-option";

const baseLinks = [
  { href: "/portal/student", label: "Home" },
  { href: "/portal/student/quarter", label: "This quarter" },
  { href: "/portal/student/documents", label: "Documents" },
];

const fullLinks = [
  { href: "/portal/student", label: "Home" },
  { href: "/portal/student/quarter", label: "This quarter" },
  { href: "/portal/student/study", label: "Study" },
  { href: "/portal/student/documents", label: "Documents" },
  { href: "/portal/student/messages", label: "Messages" },
];

export function formatDay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function usePortalStudent() {
  const demo = useDemo();
  const student =
    demo.ready && demo.state.actor.kind === "student"
      ? demo.state.students.find((item) => item.id === demo.state.actor.studentId) ?? null
      : null;
  return { ...demo, student };
}

export function StudentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { option } = useSiteOption();
  const links = option === 3 ? fullLinks : baseLinks;
  const { ready, student, state } = usePortalStudent();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-4 border-b border-border px-4">
        <MenuBar
          links={links}
          active={(href) => (href === "/portal/student" ? pathname === href : pathname.startsWith(href))}
        />
      </div>
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-6">
        {!ready ? <p className="text-sm text-muted-foreground">Opening your file…</p> : null}
        {ready && !student ? <StudentMissing instructor={state.actor.kind === "instructor"} /> : null}
        {children}
      </div>
    </div>
  );
}

function StudentMissing({ instructor }: { instructor: boolean }) {
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl">This file is not open</h1>
      <p className="mt-3 text-muted-foreground">
        {instructor
          ? "You are in the instructor view. The student portal opens from Preview student."
          : "This student is not in the file. Go back and open a student preview."}
      </p>
      <Link href={instructor ? "/portal/instructor" : "/login"} className="mt-4 inline-block text-sm text-primary underline-offset-4 hover:underline">
        {instructor ? "Back to students" : "Back to log in"}
      </Link>
    </div>
  );
}

export function dueLabel(deadline: string) {
  return isOverdue(deadline) ? `Overdue · ${formatDay(deadline)}` : `Due ${formatDay(deadline)}`;
}

export function quarterProgress(student: Student) {
  const done = student.checklist.filter((item) => item.done).length;
  return { done, total: student.checklist.length };
}

export function roadmapMark(stage: Stage) {
  if (stage <= 0) return 0;
  if (stage <= 2) return 1;
  if (stage === 3) return 3;
  if (stage === 4) return 4;
  return 5;
}

export function stageFocus(stage: Stage) {
  return stages.find((item) => item.id === stage);
}

export function stageTitle(stage: Stage) {
  return `Stage ${stage} · ${stageName(stage)}`;
}
