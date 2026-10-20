"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { money, type EnquiryStatus } from "@/data/demo";
import { menuListClass, menuTriggerClass } from "@/components/menu-bar";
import { useDemo } from "@/lib/demo-store";

const statuses: EnquiryStatus[] = ["new", "contacted", "booked", "closed"];

export function InboxBoard() {
  const { state, setEnquiryStatus, createStudentFromEnquiry } = useDemo();
  const [notice, setNotice] = useState("");
  const paid = useMemo(() => state.enquiries.filter((item) => item.payment), [state.enquiries]);

  return (
    <Tabs defaultValue="inbox">
      <div className="border-b border-border">
        <TabsList className={menuListClass}>
          <TabsTrigger value="inbox" className={menuTriggerClass}>Inbox</TabsTrigger>
          <TabsTrigger value="paid" className={menuTriggerClass}>Paid</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="inbox" className="mt-4">
        {state.enquiries.length === 0 ? (
          <p className="border border-dashed border-border p-6 text-sm text-muted-foreground">
            The inbox is empty. An enquiry or an event signup will land here.
          </p>
        ) : (
          <ul className="grid gap-3">
            {state.enquiries.map((enquiry) => (
              <li key={enquiry.id} className="border border-border bg-card/80 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{enquiry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {enquiry.school} · {enquiry.year || "year not given"} · {enquiry.email}
                    </p>
                  </div>
                  <Badge variant="outline">{enquiry.status}</Badge>
                </div>
                <p className="mt-2 text-sm">{enquiry.message || "No note."}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {enquiry.country} · grad {enquiry.graduationYear || "—"} · steps {enquiry.stepStatus || "—"} · interest {enquiry.specialty || "—"} · via {enquiry.source || "—"} · package {enquiry.packageInterest || "—"}
                  {enquiry.payment ? ` · paid ${money(enquiry.payment.amount)}` : " · unpaid"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <Button key={status} variant={enquiry.status === status ? "default" : "outline"} className="h-8" onClick={() => setEnquiryStatus(enquiry.id, status)}>
                      {status}
                    </Button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </TabsContent>
      <TabsContent value="paid" className="mt-4">
        {paid.length === 0 ? (
          <p className="border border-dashed border-border p-6 text-sm text-muted-foreground">No payments yet.</p>
        ) : (
          <ul className="grid gap-3">
            {paid.map((enquiry) => (
              <li key={enquiry.id} className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card/80 p-4">
                <div>
                  <p className="font-medium">{enquiry.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Package {enquiry.payment?.packageId} · {money(enquiry.payment?.amount ?? 0)} · {enquiry.payment?.method} · {enquiry.payment?.date}
                  </p>
                </div>
                {enquiry.studentId ? (
                  <Badge variant="secondary">Student account open</Badge>
                ) : (
                  <Button
                    className="h-9"
                    onClick={() => {
                      const id = createStudentFromEnquiry(enquiry.id);
                      setNotice(id ? `${enquiry.name} is now a student.` : "Could not open an account.");
                    }}
                  >
                    Create student account
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
        {notice ? <p className="mt-3 text-sm">{notice}</p> : null}
      </TabsContent>
    </Tabs>
  );
}
