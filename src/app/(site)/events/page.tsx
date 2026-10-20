import type { Metadata } from "next";
import { EventList } from "@/components/event-list";
import { EventRegister } from "@/components/event-register";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Events"
        title="Upcoming sessions."
        lede="Short meetings for students and parents who are still early on the path. A physician leads each one. These are not sales talks."
      />
      <div className="mx-auto grid max-w-5xl gap-12 px-5 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
        <EventList />
        <EventRegister />
      </div>
    </main>
  );
}
