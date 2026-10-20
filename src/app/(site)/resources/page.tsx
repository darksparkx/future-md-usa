import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { ResourceLibrary } from "@/components/resource-library";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Resources"
        title="Reading for students still at the start."
        lede="Short pieces on the exams, how to study, time in a U.S. clinic, and what a residency application involves."
      />
      <ResourceLibrary />
    </main>
  );
}
