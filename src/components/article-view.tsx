"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDemo } from "@/lib/demo-store";

export function ArticleView({ slug }: { slug: string }) {
  const { ready, state } = useDemo();
  const article = state.articles.find((item) => item.slug === slug);

  useEffect(() => {
    if (article) document.title = `${article.title} · FutureMdUSA`;
  }, [article]);

  if (!ready) {
    return <main className="mx-auto max-w-3xl px-5 py-16 text-sm text-muted-foreground">Loading the piece…</main>;
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl">This piece is not in the library.</h1>
        <Link href="/resources" className="mt-6 inline-block text-sm text-primary underline-offset-4 hover:underline">
          Back to the library
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">{article.category}</p>
      <h1 className="mt-3 text-4xl leading-tight">{article.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{article.dek}</p>
      <p className="mt-2 text-xs text-muted-foreground">{article.minutes} min read</p>
      <div className="mt-8 grid gap-5">
        {article.body.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      <Link href="/resources" className="mt-10 inline-block text-sm text-primary underline-offset-4 hover:underline">
        Back to the library
      </Link>
    </main>
  );
}
