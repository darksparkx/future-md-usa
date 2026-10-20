import type { Metadata } from "next";
import { AccountForm } from "@/components/account-form";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Account"
        title="Sign up."
        lede="Create an account to follow the journey. Nothing here enrolls a student by itself."
      />
      <div className="mx-auto max-w-3xl px-5 pb-20">
        <AccountForm mode="signup" />
      </div>
    </main>
  );
}
