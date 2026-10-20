"use client";

import { usePathname } from "next/navigation";
import { MenuBar } from "@/components/menu-bar";

const links = [
  { href: "/portal/instructor", label: "Students" },
  { href: "/portal/instructor/actions", label: "Next actions" },
  { href: "/portal/instructor/quarter", label: "This quarter" },
  { href: "/portal/instructor/documents", label: "Documents" },
  { href: "/portal/instructor/conference", label: "Case conference" },
];

const sections = links.slice(1).map((link) => link.href);

export function InstructorNav() {
  const pathname = usePathname();

  return (
    <div className="mt-4 border-b border-border px-4">
      <MenuBar
        links={links}
        active={(href) => {
          if (href === "/portal/instructor") {
            const onSection = sections.some((section) => pathname === section || pathname.startsWith(`${section}/`));
            return !onSection && (pathname === href || pathname.startsWith(`${href}/`));
          }
          return pathname === href || pathname.startsWith(`${href}/`);
        }}
      />
    </div>
  );
}
