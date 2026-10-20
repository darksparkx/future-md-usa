import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[calc(100svh-2.25rem)] overflow-hidden text-white">
        <Image
          src="/hero-mentorship.jpg"
          alt="A physician and a student reviewing a notebook by a window"
          fill
          priority
          className="hero-drift object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/62 to-ink/25" />
        <div className="relative z-10 flex min-h-[calc(100svh-2.25rem)] flex-col justify-end px-5 pt-28 pb-16 md:px-16 md:pb-24">
          <p className="rise font-heading text-sm tracking-[0.18em] text-white/75">FutureMdUSA</p>
          <h1 className="rise rise-late mt-4 max-w-3xl text-4xl leading-[1.02] text-white md:text-6xl">
            We don’t sell students a package. We manage their journey.
          </h1>
          <p className="rise-late mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            The right student, the right stage, the right guidance — at the right time.
          </p>
          <div className="rise-late mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-11 bg-white px-5 text-ink hover:bg-white/90")}>
              Book an assessment
            </Link>
            <Link
              href="/journey"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 border-white/40 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white")}
            >
              How the journey works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-lg leading-snug sm:text-xl lg:text-[1.35rem] lg:whitespace-nowrap xl:text-[1.55rem]">
          A student who joins at the beginning should not have to understand the entire U.S. residency system.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            ["Where am I?", "From the first USMLE question through Match, the stage you are in decides the work."],
            ["What should I be doing now?", "The live plan is the next ninety days. The longer timeline is a map, not today’s list."],
            ["What is my next milestone?", "One action, one owner, one date. When it is done, we set the next one."],
          ].map(([title, copy]) => (
            <div key={title}>
              <h2 className="text-xl">{title}</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
        <Link href="/journey" className={cn(buttonVariants({ size: "lg" }), "mt-10 h-11 px-5")}>
          See the six stages
        </Link>
      </section>

      <section className="border-t border-border/70 bg-ink text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-md text-3xl">Four kinds of work. One record.</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg bg-white/15 sm:grid-cols-2">
            {[
              ["Academic guidance", "How to study for Step 1 and Step 2 CK, including a question-review method. The question bank stays outside this product."],
              ["U.S. clinical experience", "Real rotations and mentorship. A purchased service never implies a letter or a residency outcome."],
              ["Residency strategy", "ECFMG, ERAS, a sourced program list, interviews, and a rank list. No Match probability."],
              ["Accountability", "Roadmaps, weekly actions, and a counselor who can say when the plan is wrong."],
            ].map(([title, copy], index) => (
              <li key={title} className="bg-ink px-6 py-8">
                <span className="font-heading text-sm tracking-[0.18em] text-brass">0{index + 1}</span>
                <h3 className="mt-4 text-2xl">{title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-white/72">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
