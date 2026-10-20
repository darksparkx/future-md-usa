import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import { PitchBar } from "@/components/pitch-bar";
import { DemoProvider } from "@/lib/demo-store";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "FutureMdUSA",
    template: "%s · FutureMdUSA",
  },
  description: "Physician-led U.S. residency journey for Indian medical students. We manage the journey, one stage at a time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pt-9">
        <DemoProvider>
          <Suspense fallback={<div className="fixed inset-x-0 top-0 z-50 h-9 bg-ink" />}>
            <PitchBar />
          </Suspense>
          {children}
        </DemoProvider>
      </body>
    </html>
  );
}
