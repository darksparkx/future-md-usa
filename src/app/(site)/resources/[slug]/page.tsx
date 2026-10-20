import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleView } from "@/components/article-view";
import { articles } from "@/data/demo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return { title: article?.title ?? "Article" };
}

export default function ArticlePage({ params }: Props) {
  return (
    <Suspense fallback={<p className="px-5 py-16 text-sm text-muted-foreground">Loading the article…</p>}>
      <ArticleBody params={params} />
    </Suspense>
  );
}

async function ArticleBody({ params }: Props) {
  const { slug } = await params;
  return <ArticleView slug={slug} />;
}
