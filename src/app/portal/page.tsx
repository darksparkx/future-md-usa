"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/demo-store";

export default function PortalLoginPage() {
  const { state, setActor } = useDemo();
  const router = useRouter();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6">
      <h1 className="text-4xl">Sign in to the preview</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Pick a student or the instructor. There is no password. Parent logins are not part of this option.
      </p>
      <div className="mt-8 grid gap-3">
        {state.students.map((student) => (
          <button
            key={student.id}
            type="button"
            className="border border-border bg-card/80 px-4 py-3 text-left"
            onClick={() => {
              setActor({ kind: "student", studentId: student.id });
              router.push("/portal/student");
            }}
          >
            <span className="block font-medium">{student.name}</span>
            <span className="text-sm text-muted-foreground">{student.school} · package {student.packageId}</span>
          </button>
        ))}
        <Button
          variant="outline"
          className="h-11"
          onClick={() => {
            setActor({ kind: "instructor", studentId: state.actor.studentId });
            router.push("/portal/instructor");
          }}
        >
          Enter as instructor
        </Button>
      </div>
    </main>
  );
}
