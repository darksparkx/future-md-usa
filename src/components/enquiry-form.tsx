"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, controlClass } from "@/components/page-title";
import { useDemo } from "@/lib/demo-store";
import type { PackageId } from "@/data/demo";

const empty = {
  name: "",
  email: "",
  phone: "",
  school: "",
  country: "India",
  year: "",
  graduationYear: "",
  stepStatus: "",
  specialty: "",
  source: "",
  packageInterest: "" as PackageId | "",
  message: "",
};

export function EnquiryForm({
  sourceDefault = "",
  packageDefault = "" as PackageId | "",
  submitLabel = "Send enquiry",
  doneTitle = "Enquiry received",
  doneBody = "It is in the demo staff inbox as new. Nothing was emailed.",
  showInbox = true,
}: {
  sourceDefault?: string;
  packageDefault?: PackageId | "";
  submitLabel?: string;
  doneTitle?: string;
  doneBody?: string;
  showInbox?: boolean;
}) {
  const { addEnquiry } = useDemo();
  const router = useRouter();
  const [form, setForm] = useState({ ...empty, source: sourceDefault, packageInterest: packageDefault });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"idle" | "loading" | "error" | "done">("idle");

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.school.trim()) next.school = "Medical school is required.";
    if (!form.year.trim()) next.year = "Current year is required.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setPhase("loading");
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (form.email.endsWith("@fail.test")) {
      setPhase("error");
      return;
    }
    addEnquiry(form);
    setPhase("done");
    setForm({ ...empty, source: sourceDefault, packageInterest: packageDefault });
  }

  if (phase === "done") {
    return (
      <div className="border border-border bg-card p-5">
        <h2 className="text-xl">{doneTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{doneBody}</p>
        {showInbox ? (
          <Button className="mt-4 h-10" onClick={() => router.push("/inbox")}>
            Open the inbox
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <Input className="h-10" value={form.name} onChange={(event) => set("name", event.target.value)} />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input className="h-10" type="email" value={form.email} onChange={(event) => set("email", event.target.value)} />
        </Field>
        <Field label="Phone">
          <Input className="h-10" value={form.phone} onChange={(event) => set("phone", event.target.value)} />
        </Field>
        <Field label="Medical school" error={errors.school}>
          <Input className="h-10" value={form.school} onChange={(event) => set("school", event.target.value)} />
        </Field>
        <Field label="Country">
          <Input className="h-10" value={form.country} onChange={(event) => set("country", event.target.value)} />
        </Field>
        <Field label="Current year" error={errors.year}>
          <Input className="h-10" value={form.year} onChange={(event) => set("year", event.target.value)} placeholder="3rd year" />
        </Field>
        <Field label="Graduation year">
          <Input className="h-10" value={form.graduationYear} onChange={(event) => set("graduationYear", event.target.value)} />
        </Field>
        <Field label="Step status">
          <Input className="h-10" value={form.stepStatus} onChange={(event) => set("stepStatus", event.target.value)} placeholder="Not started" />
        </Field>
        <Field label="Specialty interest">
          <Input className="h-10" value={form.specialty} onChange={(event) => set("specialty", event.target.value)} />
        </Field>
        <Field label="How you found us">
          <Input className="h-10" value={form.source} onChange={(event) => set("source", event.target.value)} />
        </Field>
      </div>
      <Field label="Package interest">
        <select className={controlClass} value={form.packageInterest} onChange={(event) => set("packageInterest", event.target.value as PackageId | "")}>
          <option value="">Not sure yet</option>
          <option value="A">A · Roadmap & Academic Guidance</option>
          <option value="B">B · Full Journey</option>
          <option value="C">C · Residency & Application</option>
        </select>
      </Field>
      <Field label="What should we know?">
        <Textarea value={form.message} onChange={(event) => set("message", event.target.value)} rows={4} />
      </Field>
      {phase === "error" ? (
        <p className="text-sm text-destructive">The demo inbox refused this address. Try another email.</p>
      ) : null}
      <Button type="submit" className="h-10 w-fit px-4" disabled={phase === "loading"}>
        {phase === "loading" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
