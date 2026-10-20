import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTitle } from "@/components/page-title";
import { PaymentSuccess } from "@/components/payment-success";

export const metadata: Metadata = { title: "Payment recorded" };

export default function SuccessPage() {
  return (
    <main>
      <PageTitle
        eyebrow="Payment"
        title="The sample payment is on the enquiry."
        lede="Staff can open a student account from a paid row. This preview did not talk to a bank."
      />
      <div className="mx-auto max-w-xl px-5 pb-20">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading the receipt…</p>}>
          <PaymentSuccess />
        </Suspense>
      </div>
    </main>
  );
}
