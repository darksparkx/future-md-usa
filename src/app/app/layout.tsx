import { Suspense } from "react";
import { OfficeNav } from "@/components/office-nav";

export default function OfficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Suspense fallback={<div className="h-24 border-b border-border" />}>
        <OfficeNav />
      </Suspense>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</div>
    </div>
  );
}
