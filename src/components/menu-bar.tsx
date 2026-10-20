"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function MenuBar({
  links,
  active,
}: {
  links: { href: string; label: string }[];
  active: (href: string) => boolean;
}) {
  return (
    <nav className="flex w-full items-stretch justify-between gap-2 overflow-x-auto text-sm">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex min-w-fit flex-1 items-center justify-center border-b-2 px-2 py-3 whitespace-nowrap",
            active(link.href)
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export const menuListClass =
  "flex h-auto! w-full justify-between gap-1 rounded-none bg-transparent p-0";

export const menuTriggerClass =
  "h-auto flex-1 rounded-none border-0 border-b-2 border-transparent bg-transparent px-2 py-3 shadow-none group-data-[variant=default]/tabs-list:data-active:shadow-none data-active:border-foreground data-active:bg-transparent data-active:shadow-none";
