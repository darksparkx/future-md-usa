import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-sm tracking-[0.08em]">FutureMdUSA</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Our physicians stay with the student from the first USMLE question to Match.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/ethics" className="hover:text-primary">Ethics</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy</Link>
          <Link href="/parents" className="hover:text-primary">For parents</Link>
          <Link href="/contact" className="hover:text-primary">Book an assessment</Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="text-xs">Preview only. No live payments, no student accounts on a server.</p>
        </div>
      </div>
    </footer>
  );
}
