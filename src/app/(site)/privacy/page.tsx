import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Privacy"
        title="A placeholder for counsel, not a finished notice."
        lede="This copy is a working draft so the preview has a real page. It is not legal advice and it should be reviewed under India’s DPDP framework, and for any U.S. handling, before a real student record is stored."
      />
      <div className="mx-auto grid max-w-3xl gap-6 px-5 pb-20 text-muted-foreground leading-relaxed">
        <p>
          The practice will hold identity, academic, examination, and application information. In production, that data sits in accounts the practice owns, encrypted in transit, with access limited by role. U.S. staff opening an India-hosted record is logged. This preview stores the demo only in your browser.
        </p>
        <p>
          A finished notice needs: what is collected, why, how long it is kept, who can see it, how a student asks for correction or deletion, how an incident is reported, and which vendors process the data. Those rules are part of the full software option. They are not switched on here.
        </p>
        <p>
          Enquiry forms on this preview ask for contact details, school, year, exam status, and package interest so a staff inbox can be demonstrated. Do not enter a real student’s documents or examination content.
        </p>
        <p className="text-sm">
          Counsel review is required before launch. Retention, deletion, and the cross-border path between the India office and the U.S. team are decisions for the practice and its lawyers, not for this mock.
        </p>
      </div>
    </main>
  );
}
