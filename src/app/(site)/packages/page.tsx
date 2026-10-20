import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/components/page-title";
import { money, notGuaranteed, packages } from "@/data/demo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Packages" };

export default function PackagesPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Packages"
        title="Three packages. One journey."
        lede="Package A is the starting plan, for someone still early. Package B is the whole path, from studying through clinical time and the application. Package C is for a student who is already close to applying."
      />
      <div className="mx-auto grid max-w-5xl gap-6 px-5 pb-12 md:grid-cols-3">
        {packages.map((item) => (
          <article key={item.id} className="flex flex-col border border-border bg-card/80 p-5">
            <p className="text-xs tracking-[0.16em] text-primary uppercase">Package {item.id}</p>
            <h2 className="mt-2 text-2xl">{item.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.forWhom}</p>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed">
              {item.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-auto pt-5 font-heading text-xl">{money(item.sampleFee)}</p>
            <Link href={`/checkout/${item.id}`} className={cn(buttonVariants(), "mt-4 h-10")}>
              Get Package {item.id}
            </Link>
          </article>
        ))}
      </div>
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="text-2xl">What we do not promise</h2>
        <ul className="mt-6 grid gap-3">
          {notGuaranteed.map((item) => (
            <li key={item} className="border-l-2 border-destructive/40 pl-4 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
          Clinical time means real work in a clinic. A letter is a physician’s assessment of that work, written only after they have seen it.
        </p>
      </section>
    </main>
  );
}
