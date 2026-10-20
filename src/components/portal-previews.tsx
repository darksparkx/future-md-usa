"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-store";
import { useSiteOption } from "@/lib/site-option";

export function PortalPreviews({ office = false }: { office?: boolean }) {
  const { state, setActor } = useDemo();
  const { option } = useSiteOption();
  const router = useRouter();
  const studentId = state.students[0]?.id ?? state.actor.studentId;

  return (
    <div className="mt-10 border-t border-border pt-8">
      <p className="text-sm text-muted-foreground">Or open a portal preview.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          className="h-10 px-4"
          onClick={() => {
            setActor({ kind: "student", studentId });
            router.push("/portal/student");
          }}
        >
          Preview student
        </Button>
        <Button
          variant="outline"
          className="h-10 px-4"
          onClick={() => {
            setActor({ kind: "instructor", studentId });
            router.push("/portal/instructor");
          }}
        >
          Preview instructor
        </Button>
        {office && option === 3 ? (
          <Button variant="outline" className="h-10 px-4" onClick={() => router.push("/app")}>
            Preview office
          </Button>
        ) : null}
      </div>
    </div>
  );
}
