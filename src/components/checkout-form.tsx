"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, controlClass } from "@/components/page-title";
import { money, packages, type PackageId, type PayMethod } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export function CheckoutForm({ packageId }: { packageId: PackageId }) {
  const pack = packages.find((item) => item.id === packageId)!;
  const { addPaidEnquiry } = useDemo();
  const router = useRouter();
  const [method, setMethod] = useState<PayMethod>("card");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [card, setCard] = useState("");
  const [upi, setUpi] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "error" | "empty">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.includes("@") || !school.trim()) {
      setPhase("empty");
      setMessage("Name, email, and medical school are required before a demo payment.");
      return;
    }
    if (method === "card" && card.replace(/\s/g, "").length < 12) {
      setPhase("empty");
      setMessage("Enter a sample card number. Nothing is charged.");
      return;
    }
    if (method === "upi" && !upi.includes("@")) {
      setPhase("empty");
      setMessage("Enter a sample UPI id, such as name@okdemo.");
      return;
    }
    setPhase("loading");
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (card.replace(/\s/g, "").startsWith("0000")) {
      setPhase("error");
      setMessage("Demo decline. Use any other number to record a sample payment.");
      return;
    }
    const id = addPaidEnquiry({
      name,
      email,
      phone: "",
      school,
      country: "India",
      year: "",
      graduationYear: "",
      stepStatus: "",
      specialty: "",
      source: "Package checkout",
      packageInterest: packageId,
      message: `Sample payment for package ${packageId}.`,
    }, {
      amount: pack.sampleFee,
      method,
      date: new Date().toISOString().slice(0, 10),
      packageId,
    });
    router.push(`/checkout/success?enquiry=${id}`);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border border-border bg-card/80 p-5" noValidate>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.16em] text-primary uppercase">Package {pack.id}</p>
          <h2 className="text-2xl">{pack.name}</h2>
        </div>
        <p className="font-heading text-2xl">{money(pack.sampleFee)}</p>
      </div>
      <p className="text-sm text-muted-foreground">
        Sample amount for this preview. No card is charged. Package fees are confirmed after assessment.
      </p>
      <Field label="Name">
        <Input className="h-10" value={name} onChange={(event) => setName(event.target.value)} />
      </Field>
      <Field label="Email">
        <Input className="h-10" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </Field>
      <Field label="Medical school">
        <Input className="h-10" value={school} onChange={(event) => setSchool(event.target.value)} />
      </Field>
      <Field label="Method">
        <select className={controlClass} value={method} onChange={(event) => setMethod(event.target.value as PayMethod)}>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
      </Field>
      {method === "card" ? (
        <Field label="Card number" hint="Use 0000… to see a decline.">
          <Input className="h-10" inputMode="numeric" value={card} onChange={(event) => setCard(event.target.value)} placeholder="4242 4242 4242 4242" />
        </Field>
      ) : (
        <Field label="UPI id">
          <Input className="h-10" value={upi} onChange={(event) => setUpi(event.target.value)} placeholder="name@okdemo" />
        </Field>
      )}
      {phase === "error" || phase === "empty" ? <p className="text-sm text-destructive">{message}</p> : null}
      <Button type="submit" className="h-10" disabled={phase === "loading"}>
        {phase === "loading" ? "Recording…" : "Record sample payment"}
      </Button>
    </form>
  );
}
