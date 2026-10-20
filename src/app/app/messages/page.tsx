"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, controlClass } from "@/components/page-title";
import { roleLabels, type ActivityTag } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

const tags: ActivityTag[] = ["study", "document", "stage", "clinical", "application"];

export default function OfficeMessagesPage() {
  const { state, sendChat, addActivity } = useDemo();
  const [studentId, setStudentId] = useState(state.students[0]?.id ?? "");
  const activeId = studentId || state.students[0]?.id || "";
  const [chat, setChat] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState<ActivityTag>("study");
  const [error, setError] = useState("");
  const author = roleLabels[state.role];

  return (
    <main className="grid gap-10">
      <header>
        <h1 className="text-4xl">Messages</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A private thread with the student, plus a tagged note on the work itself. Parents do not have a login here.
        </p>
      </header>

      <Field label="Student">
        <select className={controlClass} value={activeId} onChange={(event) => setStudentId(event.target.value)}>
          {state.students.map((student) => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
      </Field>

      <section className="grid gap-3 border border-border bg-card/70 p-4">
        <h2 className="text-xl">Thread</h2>
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const ok = sendChat(activeId, "staff", author, chat);
            setError(ok ? "" : "Write the message first.");
            if (ok) setChat("");
          }}
        >
          <Textarea value={chat} onChange={(event) => setChat(event.target.value)} placeholder="Message the student" />
          <Button type="submit" className="h-10 w-fit">Send</Button>
        </form>
        <ul className="grid gap-2 text-sm">
          {state.messages.filter((item) => item.studentId === activeId).map((message) => (
            <li key={message.id} className="border border-border px-3 py-2">
              <span className="text-muted-foreground">{message.author}: </span>
              {message.body}
            </li>
          ))}
        </ul>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </section>

      <section className="grid gap-3 border border-border p-4">
        <h2 className="text-xl">Tagged note</h2>
        <p className="text-sm text-muted-foreground">Study, document, stage, clinical time, or the application. The student can read it. It is not a chat message.</p>
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const ok = addActivity(activeId, tag, author, note);
            setError(ok ? "" : "The note needs a line of text.");
            if (ok) setNote("");
          }}
        >
          <Field label="Tag">
            <select className={controlClass} value={tag} onChange={(event) => setTag(event.target.value as ActivityTag)}>
              {tags.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </Field>
          <Textarea value={note} onChange={(event) => setNote(event.target.value)} />
          <Button type="submit" variant="outline" className="h-10 w-fit">Add note</Button>
        </form>
        <ul className="grid gap-2 text-sm">
          {state.activities.filter((item) => item.studentId === activeId).map((item) => (
            <li key={item.id}>
              <span className="text-brass uppercase tracking-[0.12em] text-xs">{item.tag}</span> · {item.body}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
