"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDemo } from "@/lib/demo-store";

export default function PrivacyDeskPage() {
  const { state, addIncident, setIncidentStatus } = useDemo();
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="grid gap-10">
      <header>
        <h1 className="text-4xl">Privacy desk</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Retention, the vendors that touch student data, an incident log, and the trail when a U.S. physician opens a file held for the India office.
        </p>
      </header>

      <section className="max-w-2xl text-sm leading-relaxed">
        <h2 className="text-xl">Retention</h2>
        <p className="mt-2 text-muted-foreground">
          An active student’s file stays for the journey. A closed enquiry with no student record can be deleted when the family asks. Document names stay with the file. Question text is never stored.
        </p>
      </section>

      <section>
        <h2 className="text-xl">Vendors</h2>
        <ul className="mt-3 grid gap-3">
          {state.vendors.map((vendor) => (
            <li key={vendor.name} className="border border-border p-4 text-sm">
              <p className="font-medium">{vendor.name}</p>
              <p className="mt-1">{vendor.purpose}</p>
              <p className="mt-1 text-muted-foreground">{vendor.data}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-2xl">
        <h2 className="text-xl">Incident log</h2>
        <form
          className="mt-3 grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const ok = addIncident(summary);
            setError(ok ? "" : "Describe what happened.");
            if (ok) setSummary("");
          }}
        >
          <Textarea value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="What happened, and whose data was involved" />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="h-10 w-fit">Log incident</Button>
        </form>
        <ul className="mt-4 grid gap-3">
          {state.incidents.map((incident) => (
            <li key={incident.id} className="flex flex-wrap items-start justify-between gap-3 border border-border p-4 text-sm">
              <div>
                <p className="text-muted-foreground">{incident.at} · {incident.status}</p>
                <p className="mt-1">{incident.summary}</p>
              </div>
              {incident.status === "open" ? (
                <Button variant="outline" className="h-9" onClick={() => setIncidentStatus(incident.id, "closed")}>Close</Button>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl">U.S. access trail</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Switch the role to U.S. physician and open a student file. That open is written here. Other roles do not add a line.
        </p>
        {state.accessLog.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No U.S. access recorded in this browser yet.</p>
        ) : (
          <ul className="mt-3 grid gap-1 text-sm">
            {state.accessLog.map((entry) => (
              <li key={entry.id}>{entry.at.slice(0, 16).replace("T", " ")} · {entry.action} · {entry.studentId}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
