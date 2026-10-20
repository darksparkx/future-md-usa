"use client";

import { useState } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Field, controlClass } from "@/components/page-title";
import { useDemo } from "@/lib/demo-store";

export function EventRegister() {
  const { ready, state } = useDemo();
  const [eventId, setEventId] = useState(state.events[0]?.id ?? "");
  const event = state.events.find((item) => item.id === eventId) ?? state.events[0];

  if (!ready) return null;

  if (!event) {
    return <p className="text-sm text-muted-foreground">No sessions to register for yet.</p>;
  }

  return (
    <div id="register" className="border border-border bg-card/80 p-5">
      <h2 className="text-2xl">Save a seat</h2>
      <p className="mt-2 mb-4 text-sm leading-relaxed text-muted-foreground">
        Choose a session. We will email the time and the place. Nothing else is booked.
      </p>
      <Field label="Session">
        <select className={controlClass} value={eventId} onChange={(change) => setEventId(change.target.value)}>
          {state.events.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title} · {item.where}
            </option>
          ))}
        </select>
      </Field>
      <div className="mt-4">
        <EnquiryForm
          key={event.id}
          sourceDefault={event.title}
          submitLabel="Register"
          doneTitle="You're on the list."
          doneBody="We'll email the time and the place. Nothing else is booked until you hear from us."
          showInbox={false}
        />
      </div>
    </div>
  );
}
