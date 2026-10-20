"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDay, usePortalStudent } from "@/components/student-portal";
import { useSiteOption } from "@/lib/site-option";

export default function StudentMessagesPage() {
  const { state, student, sendChat } = usePortalStudent();
  const { option } = useSiteOption();
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  if (!student) return null;
  if (option !== 3) {
    return (
      <main className="max-w-xl">
        <h1 className="text-3xl">Messages stay on WhatsApp</h1>
        <p className="mt-3 text-muted-foreground">
          This account does not include a chat. Write to {student.counselor} on WhatsApp.
        </p>
        <Link href="/portal/student" className="mt-4 inline-block text-sm text-primary underline-offset-4 hover:underline">
          Back home
        </Link>
      </main>
    );
  }

  const messages = state.messages.filter((item) => item.studentId === student.id);
  const notes = state.activities.filter((item) => item.studentId === student.id);

  return (
    <main className="grid max-w-2xl gap-10">
      <header>
        <h1 className="text-3xl">Messages</h1>
        <p className="mt-2 text-muted-foreground">
          A private thread with {student.counselor}. Notes tagged to your work sit underneath. This is not a parent login.
        </p>
      </header>

      <section>
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const ok = sendChat(student.id, "student", student.name, body);
            setError(ok ? "" : "Write a message, and keep it under 500 characters.");
            if (ok) setBody("");
          }}
        >
          <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write to your counselor" />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="h-10 w-fit">Send</Button>
        </form>
        {messages.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {messages.map((message) => (
              <li key={message.id} className="border border-border px-4 py-3 text-sm">
                <p className="text-xs tracking-[0.14em] text-primary uppercase">
                  {message.author} · {formatDay(message.at.slice(0, 10))}
                </p>
                <p className="mt-2">{message.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl">Notes on your work</h2>
        <p className="mt-2 text-sm text-muted-foreground">Your team tags these to study, documents, stage, clinical time, or the application.</p>
        {notes.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No tagged notes yet.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {notes.map((note) => (
              <li key={note.id} className="border border-border px-4 py-3 text-sm">
                <p className="text-xs tracking-[0.14em] text-brass uppercase">{note.tag} · {note.author}</p>
                <p className="mt-2">{note.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
