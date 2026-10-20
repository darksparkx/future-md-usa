"use client";

import Link from "next/link";
import { resourceCategories } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

const blurbs: Record<(typeof resourceCategories)[number], string> = {
  "USMLE 101": "What the exams are, how long the path takes, and which stage a beginner is actually in.",
  "Study strategy": "How to review a question, how self-assessments change the plan, and the mistakes that repeat.",
  Career: "Whether U.S. residency fits, and what an IMG profile has to carry.",
  "U.S. experience": "What clinical experience is, why it matters, and how mentorship actually works.",
  Residency: "ERAS, the Match, and how an application is checked before it is sent.",
  "Real experiences": "Student journeys and physician perspectives, published only with consent.",
};

export function ResourceLibrary() {
  const { ready, state } = useDemo();

  if (!ready) return <p className="mx-auto max-w-5xl px-5 pb-20 text-sm text-muted-foreground">Loading the library…</p>;

  return (
    <div className="mx-auto grid max-w-5xl gap-4 px-5 pb-20 md:grid-cols-2">
      {resourceCategories.map((category) => {
        const pieces = state.articles.filter((article) => article.category === category);
        return (
          <section key={category} className="border border-border bg-card/70 p-5">
            <h2 className="text-xl">{category}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{blurbs[category]}</p>
            {pieces.length ? (
              <ul className="mt-4 grid gap-2">
                {pieces.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/resources/${article.slug}`} className="text-primary underline-offset-4 hover:underline">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">More on this is on the way.</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
