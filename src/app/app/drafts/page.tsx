"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDemo } from "@/lib/demo-store";

export default function DraftsPage() {
  const { state, setDraftStatus } = useDemo();
  const canDecide = state.role !== "coordinator";

  return (
    <main>
      <h1 className="text-4xl">AI drafts</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        These are canned drafts for the preview. Approving one lets the student read it. Rejecting one keeps it off their file. Nothing publishes by itself.
      </p>
      <ul className="mt-6 grid gap-4">
        {state.drafts.map((draft) => {
          const student = state.students.find((item) => item.id === draft.studentId);
          return (
            <li key={draft.id} className="border border-border bg-card/80 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm">{student?.name} · {draft.kind}</p>
                <Badge variant={draft.status === "approved" ? "secondary" : draft.status === "rejected" ? "destructive" : "outline"}>
                  {draft.status}
                </Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{draft.body}</p>
              {canDecide && draft.status === "pending" ? (
                <div className="mt-4 flex gap-2">
                  <Button className="h-9" onClick={() => setDraftStatus(draft.id, "approved")}>Approve</Button>
                  <Button variant="outline" className="h-9" onClick={() => setDraftStatus(draft.id, "rejected")}>Reject</Button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
