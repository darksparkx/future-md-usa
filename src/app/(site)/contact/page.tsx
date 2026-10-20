import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Book an assessment" };

export default function ContactPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Contact"
        title="Book an assessment."
        lede="Nobody is enrolled from a slogan. Tell us the school, the year, and where the exams stand."
      />
      <div className="mx-auto max-w-3xl px-5 pb-20">
        <EnquiryForm />
        <p className="mt-4 text-xs text-muted-foreground">To see the error state, use an email ending in @fail.test.</p>
      </div>
    </main>
  );
}
