"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/lib/demo-store";
import { useSiteOption } from "@/lib/site-option";
import { cn } from "@/lib/utils";

export function PitchBar() {
  const pathname = usePathname();
  const { reset } = useDemo();
  const { option, setOption } = useSiteOption();
  const onApp = pathname.startsWith("/app");
  const onAccount = pathname.startsWith("/portal") || pathname.startsWith("/login") || pathname.startsWith("/signup");
  const option3 = option === 3 || onApp;
  const option2 = !option3 && (option === 2 || onAccount);

  const modes = [
    { href: "/", label: "Option 1", active: !option3 && !option2, option: 1 as const },
    { href: "/", label: "Option 2", active: option2, option: 2 as const },
    { href: "/", label: "Option 3", active: option3, option: 3 as const },
  ];

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-9 overflow-x-auto border-b border-white/10 bg-ink text-xs text-white/80">
      <div className="flex h-9 w-full min-w-max items-center justify-between gap-3 px-3">
      <p className="hidden sm:block">Pitch preview</p>
      <nav className="flex items-center gap-1">
        {modes.map((mode) => (
          <Link
            key={mode.label}
            href={mode.href}
            onClick={() => {
              if (mode.option) setOption(mode.option);
            }}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              mode.active ? "bg-white text-ink" : "hover:bg-white/10 hover:text-white",
            )}
          >
            {mode.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/desk" className={cn("hover:text-white", pathname.startsWith("/desk") && "text-white")}>
          Website desk
        </Link>
        <button type="button" onClick={reset} className="hover:text-white">
          Reset demo
        </button>
      </div>
      </div>
    </div>
  );
}
