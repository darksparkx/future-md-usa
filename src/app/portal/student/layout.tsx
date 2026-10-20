import { Suspense } from "react";
import { StudentShell } from "@/components/student-portal";

export const metadata = { title: "Your file" };

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Opening your file…</p>}>
      <StudentShell>{children}</StudentShell>
    </Suspense>
  );
}
