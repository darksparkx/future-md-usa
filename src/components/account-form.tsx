"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/page-title";
import { PortalPreviews } from "@/components/portal-previews";

export function AccountForm({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (signup && !name.trim()) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (password.trim().length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone(true);
  }

  return (
    <div>
      {done ? (
        <div className="border border-border bg-card p-5">
          <h2 className="text-xl">{signup ? "Account noted" : "Sign-in noted"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This preview does not open a live account. Use a portal below.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid max-w-md gap-4" noValidate>
          {signup ? (
            <Field label="Full name" error={errors.name}>
              <Input className="h-10" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            </Field>
          ) : null}
          <Field label="Email" error={errors.email}>
            <Input className="h-10" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
          </Field>
          <Field label="Password" error={errors.password}>
            <Input className="h-10" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={signup ? "new-password" : "current-password"} />
          </Field>
          <Button type="submit" className="h-10 w-fit px-4">
            {signup ? "Sign up" : "Log in"}
          </Button>
          <p className="text-sm text-muted-foreground">
            {signup ? (
              <>
                Already have an account? <Link href="/login" className="text-foreground underline underline-offset-4">Log in</Link>
              </>
            ) : (
              <>
                New here? <Link href="/signup" className="text-foreground underline underline-offset-4">Sign up</Link>
              </>
            )}
          </p>
        </form>
      )}
      <PortalPreviews office={mode === "login"} />
    </div>
  );
}
