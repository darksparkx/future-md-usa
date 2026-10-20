"use client";

import { useState } from "react";
import { formatDay, usePortalStudent } from "@/components/student-portal";

export default function DocumentsPage() {
  const { student, addDocument, receiveDocument } = usePortalStudent();
  const [message, setMessage] = useState("");

  if (!student) return null;
  const waiting = student.documents.filter((doc) => !doc.uploadedAt);
  const received = student.documents.filter((doc) => doc.uploadedAt);

  function take(file: File | undefined, docId?: string) {
    if (!file) return;
    if (!file.name.trim()) {
      setMessage("That file has no name.");
      return;
    }
    if (file.name.length > 120) {
      setMessage("Use a shorter file name.");
      return;
    }
    if (docId) receiveDocument(student!.id, docId);
    else addDocument(student!.id, file.name);
    setMessage("The name and today’s date are saved. The file itself stays on your computer.");
  }

  return (
    <main className="grid max-w-2xl gap-8">
      <header>
        <h1 className="text-3xl">Documents</h1>
        <p className="mt-2 text-muted-foreground">
          Send what your counselor asked for. Only the name and the date are kept here.
        </p>
      </header>

      <section>
        <h2 className="text-xl">Still needed</h2>
        {waiting.length === 0 ? (
          <p className="mt-3 border border-dashed border-border p-4 text-sm text-muted-foreground">Nothing else has been requested.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {waiting.map((doc) => (
              <li key={doc.id} className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card/70 p-4 text-sm">
                <span>{doc.name}</span>
                <label className="text-primary">
                  Choose file
                  <input
                    className="mt-1 block w-full text-xs text-muted-foreground"
                    type="file"
                    onChange={(event) => {
                      take(event.target.files?.[0], doc.id);
                      event.target.value = "";
                    }}
                  />
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl">Received</h2>
        {received.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nothing received yet.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {received.map((doc) => (
              <li key={doc.id} className="flex flex-wrap items-center justify-between gap-3 border border-border p-4 text-sm">
                <span>{doc.name}</span>
                <span className="text-muted-foreground">Received {formatDay(doc.uploadedAt!)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <label className="block text-sm">
        Add something else
        <input
          className="mt-2 block w-full text-sm"
          type="file"
          onChange={(event) => {
            take(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </main>
  );
}
