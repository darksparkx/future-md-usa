import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Ethics" };

const points = [
  {
    title: "We will not promise a result",
    body: "A Match, an interview invitation, a letter, and a visa are not things we can sell. Anyone who tells you otherwise is not speaking for this practice.",
  },
  {
    title: "Clinical time is real work",
    body: "A rotation is time in a clinic, with physicians who are there. Paying for it does not come with a letter. A letter is written only after a physician has seen your work.",
  },
  {
    title: "Your file stays true",
    body: "We will not invent research, a publication, or a line on your application. What goes in the file is work you actually did.",
  },
  {
    title: "A fact has a source",
    body: "If we tell you something about a program, ECFMG, ERAS, or a visa rule, we say where we read it and when we checked. “I heard they don’t take international graduates” is not an answer.",
  },
];

export default function EthicsPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Ethics"
        title="What you can count on."
        lede="We will tell you the hard parts. We will not sell you a result we cannot deliver."
      />
      <div className="mx-auto grid max-w-3xl gap-8 px-5 pb-20">
        {points.map((point) => (
          <section key={point.title}>
            <h2 className="text-2xl">{point.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{point.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
