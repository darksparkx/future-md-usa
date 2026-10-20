"use client";

import { useDemo } from "@/lib/demo-store";

export function EventList() {
  const { ready, state } = useDemo();

  if (!ready) return <p className="text-sm text-muted-foreground">Loading sessions…</p>;

  if (state.events.length === 0) {
    return <p className="text-sm text-muted-foreground">No sessions are scheduled.</p>;
  }

  return (
    <ol className="grid gap-4">
      {state.events.map((event) => (
        <li key={event.id} className="border border-border bg-card/80 p-5">
          <p className="text-sm text-brass">
            {event.when} · {event.time}
          </p>
          <h2 className="mt-2 text-2xl">{event.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{event.where}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{event.detail}</p>
          <p className="mt-3 text-sm leading-relaxed">{event.audience}</p>
        </li>
      ))}
    </ol>
  );
}
