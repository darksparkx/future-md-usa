"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { money, type EnquiryStatus } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

const columns: EnquiryStatus[] = ["new", "contacted", "booked", "closed"];

export default function PipelinePage() {
  const { state, setEnquiryStatus, createStudentFromEnquiry } = useDemo();

  return (
    <main>
      <h1 className="text-4xl">Enquiry to student</h1>
      <p className="mt-2 text-muted-foreground">Move a lead across the pipeline. A paid row can open the student record.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {columns.map((status) => (
          <section key={status}>
            <h2 className="text-sm tracking-[0.14em] uppercase">{status}</h2>
            <ul className="mt-3 grid gap-3">
              {state.enquiries.filter((item) => item.status === status).length === 0 ? (
                <li className="border border-dashed border-border p-3 text-xs text-muted-foreground">Empty</li>
              ) : null}
              {state.enquiries
                .filter((item) => item.status === status)
                .map((enquiry) => (
                  <li key={enquiry.id} className="border border-border bg-card/80 p-3 text-sm">
                    <p className="font-medium">{enquiry.name}</p>
                    <p className="text-xs text-muted-foreground">{enquiry.school}</p>
                    <p className="mt-2 text-xs">{enquiry.payment ? `Paid ${money(enquiry.payment.amount)}` : "Unpaid"}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {columns.filter((item) => item !== status).map((next) => (
                        <button key={next} type="button" className="text-xs text-primary underline-offset-2 hover:underline" onClick={() => setEnquiryStatus(enquiry.id, next)}>
                          {next}
                        </button>
                      ))}
                    </div>
                    {enquiry.studentId ? (
                      <Link href={`/app/students/${enquiry.studentId}`} className="mt-2 inline-block text-xs text-primary">
                        Open file
                      </Link>
                    ) : enquiry.payment ? (
                      <Button className="mt-2 h-8" onClick={() => createStudentFromEnquiry(enquiry.id)}>
                        Create student
                      </Button>
                    ) : null}
                    {enquiry.packageInterest ? <Badge variant="outline" className="mt-2">{enquiry.packageInterest}</Badge> : null}
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
