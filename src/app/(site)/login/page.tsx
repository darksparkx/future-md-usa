import type { Metadata } from "next";
import { AccountForm } from "@/components/account-form";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Account"
        title="Log in."
        lede="Students and instructors sign in here. The journey on the site stays the same."
      />
      <div className="mx-auto max-w-3xl px-5 pb-20">
        <AccountForm mode="login" />
      </div>
    </main>
  );
}
