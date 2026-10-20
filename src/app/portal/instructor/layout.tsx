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

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col">
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
      <div className="mx-auto w-full max-w-5xl px-4 py-6">{children}</div>
    </div>
  );
}
