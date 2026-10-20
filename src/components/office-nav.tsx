"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MenuBar } from "@/components/menu-bar";
import { Badge } from "@/components/ui/badge";
import { roleLabels, type StaffRole } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";
import { setSiteOption } from "@/lib/site-option";

const links = [
  { href: "/app", label: "Home" },
  { href: "/app/pipeline", label: "Pipeline" },
  { href: "/app/students", label: "Students" },
  { href: "/app/review", label: "Application review" },
  { href: "/app/study", label: "Study" },
  { href: "/app/programs", label: "Programs" },
  { href: "/app/drafts", label: "AI drafts" },
  { href: "/app/messages", label: "Messages" },
  { href: "/app/privacy", label: "Privacy" },
];

const roles: StaffRole[] = ["ops", "counselor", "coordinator", "physician"];

export function OfficeNav() {
  const pathname = usePathname();
  const { state, setRole } = useDemo();

  useEffect(() => {
    setSiteOption(3);
  }, []);

  return (
    <div className="grid w-full gap-4 border-b border-border px-4 pt-6 pb-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-6 px-2">Option 3</Badge>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">Public site</Link>
        </div>
        <label className="flex items-center gap-2 text-sm">
          Role
          <select
            className="h-9 rounded-lg border border-input bg-card px-2"
            value={state.role}
            onChange={(event) => setRole(event.target.value as StaffRole)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>{roleLabels[role]}</option>
            ))}
          </select>
        </label>
      </div>
      <MenuBar
        links={links}
        active={(href) => (href === "/app" ? pathname === "/app" : pathname === href || pathname.startsWith(`${href}/`))}
      />
    </div>
  );
}
