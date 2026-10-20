import Link from "next/link";
import { PortalMark } from "@/components/portal-mark";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-6">
        <PortalMark />
        <Link href="/portal" className="text-xs text-muted-foreground hover:text-foreground">
          Switch account
        </Link>
      </div>
      {children}
    </div>
  );
}
