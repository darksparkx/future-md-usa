import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { pillars } from "@/data/demo";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Services"
        title="What we help with"
        lede="Studying, U.S. clinical time, the residency application, and a plan someone follows. They do not all start on day one. A student who has just heard of Step 1 is not put on a rotation or an application."
      />
      <div className="mx-auto grid max-w-3xl gap-12 px-5 pb-20">
        {pillars.map((pillar) => (
          <section key={pillar.name}>
            <h2 className="text-2xl">{pillar.name}</h2>
            {pillar.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
