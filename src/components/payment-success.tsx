"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { money } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export function PaymentSuccess() {
  const params = useSearchParams();
  const id = params.get("enquiry");
  const { state } = useDemo();
  const enquiry = state.enquiries.find((item) => item.id === id);

  if (!enquiry?.payment) {
    return (
      <div className="border border-border bg-card p-5">
        <h2 className="text-xl">No payment on this link</h2>
        <p className="mt-2 text-sm text-muted-foreground">The demo record is missing, or the preview was reset.</p>
        <Link href="/packages" className="mt-4 inline-block text-primary underline-offset-4 hover:underline">
          Back to packages
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card p-5">
      <p className="text-xs tracking-[0.16em] text-primary uppercase">Recorded</p>
      <h2 className="mt-2 text-2xl">{enquiry.name}</h2>
      <p className="mt-2 text-muted-foreground">
        {money(enquiry.payment.amount)} by {enquiry.payment.method === "card" ? "card" : "UPI"} for package {enquiry.payment.packageId}. Marked on {enquiry.payment.date}.
      </p>
      <Link href="/inbox" className="mt-5 inline-block text-primary underline-offset-4 hover:underline">
        See it on the paid list
      </Link>
    </div>
  );
}
