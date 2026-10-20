import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/page-title";
import { buttonVariants } from "@/components/ui/button";
import { stages } from "@/data/demo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "How the journey works" };

export default function JourneyPage() {
  return (
    <main>
      <PageTitle
        eyebrow="The journey"
        title="Six stages. The next ninety days are the work."
        lede="A third-year student who has never heard of Step 1 does not get the same roadmap as someone who has passed Step 2 CK. The long road is the backdrop. The plan you live by is always this quarter."
      />
      <ol className="mx-auto max-w-3xl px-5 pb-8">
        {stages.map((stage, index) => (
          <li
            key={stage.id}
            className="rise grid gap-2 border-t border-border py-8"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <p className="text-xs tracking-[0.18em] text-brass uppercase">Stage {stage.id}</p>
            <h2 className="text-2xl">{stage.name}</h2>
            <p className="text-foreground/80 italic">“{stage.student}”</p>
            <p className="leading-relaxed text-muted-foreground">{stage.focus}</p>
            <p className="text-sm">Main question: {stage.question}</p>
          </li>
        ))}
      </ol>
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="text-2xl">How a quarter actually runs</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Take stock, set a plan, do the work, see what changed, then take stock again. That becomes the next ninety days. The full road stays in sight — medical school, USMLE, U.S. clinical experience, profile, ERAS, interviews, Match — so the far goal never gets mixed up with this month.
        </p>
        <p className="mt-6 text-sm">
          Every student in motion also has one next step: the aim, what is in the way, the move, who does it, and the date. “Preparing for Step 1” is not a step.
        </p>
        <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-5")}>
          Book an assessment
        </Link>
      </section>
    </main>
  );
}
