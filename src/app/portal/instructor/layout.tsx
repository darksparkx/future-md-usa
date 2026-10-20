import { Suspense } from "react";
import { InstructorNav } from "@/components/instructor-nav";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <Suspense fallback={<div className="mt-4 h-12 border-b border-border" />}>
        <InstructorNav />
      </Suspense>
      <div className="mx-auto w-full max-w-5xl px-4 py-6">{children}</div>
    </div>
  );
}
