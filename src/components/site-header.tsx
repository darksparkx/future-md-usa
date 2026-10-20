"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useSiteOption } from "@/lib/site-option";
import { cn } from "@/lib/utils";

const links = [
  { href: "/journey", label: "Journey" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/parents", label: "Parents" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/events", label: "Events" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";
  const { option } = useSiteOption();
  const accounts = option >= 2 || pathname.startsWith("/login") || pathname.startsWith("/signup");
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-40",
        home ? "absolute inset-x-0 top-9" : "sticky top-9 border-b border-border/80 bg-background/85 backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className={cn("font-heading text-xl leading-none", home ? "text-white" : "text-ink")}>
          FutureMdUSA
        </Link>
        <nav className="hidden min-w-0 flex-1 items-stretch justify-between lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-1 items-center justify-center px-2 text-sm whitespace-nowrap",
                home ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
                pathname === link.href && (home ? "text-white" : "text-foreground"),
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {accounts ? (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "hidden h-10 px-4 sm:inline-flex",
                  home && "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
                  pathname === "/login" && (home ? "bg-white/10 text-white" : "bg-muted text-foreground"),
                )}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "hidden h-10 px-4 sm:inline-flex",
                  home && "bg-white text-ink hover:bg-white/90",
                )}
              >
                Sign up
              </Link>
            </>
          ) : (
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "hidden h-10 px-4 sm:inline-flex", home && "bg-white text-ink hover:bg-white/90")}
            >
              Book an assessment
            </Link>
          )}
          <button
            type="button"
            className={cn("inline-flex size-10 items-center justify-center lg:hidden", home ? "text-white" : "text-ink")}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open ? (
        <div className={cn("border-t px-5 py-4 lg:hidden", home ? "border-white/15 bg-ink/95 text-white" : "border-border bg-card")}>
          <div className="grid gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-base">
                {link.label}
              </Link>
            ))}
            {accounts ? (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-base font-medium">
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="text-base font-medium">
                  Sign up
                </Link>
              </>
            ) : (
              <Link href="/contact" onClick={() => setOpen(false)} className="text-base font-medium">
                Book an assessment
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
