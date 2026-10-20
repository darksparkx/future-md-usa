import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { PageTitle } from "@/components/page-title";
import { packages, type PackageId } from "@/data/demo";

type Props = { params: Promise<{ packageId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { packageId } = await params;
  return { title: `Checkout ${packageId}` };
}

export default function CheckoutPage({ params }: Props) {
  return (
    <Suspense fallback={<p className="px-5 py-16 text-sm text-muted-foreground">Loading checkout…</p>}>
      <CheckoutBody params={params} />
    </Suspense>
  );
}

async function CheckoutBody({ params }: Props) {
  const { packageId } = await params;
  const id = packages.find((item) => item.id === packageId)?.id as PackageId | undefined;
  if (!id) notFound();

  return (
    <main>
      <PageTitle
        eyebrow="Payment"
        title="A sample checkout."
        lede="Card or UPI, recorded against the enquiry. Staff can see who has paid. Creating the student account is a separate step in the inbox."
      />
      <div className="mx-auto max-w-xl px-5 pb-20">
        <CheckoutForm packageId={id} />
      </div>
    </main>
  );
}
