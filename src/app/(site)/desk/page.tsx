import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { WebsiteDesk } from "@/components/website-desk";

export const metadata: Metadata = { title: "Website desk" };

export default function DeskPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Website desk"
        title="Run the public site from here."
        lede="Read the enquiries, publish a piece in the library, or add a session to the events page."
      />
      <WebsiteDesk />
    </main>
  );
}
