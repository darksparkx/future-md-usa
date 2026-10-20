"use client";

import { quarterProgress, roadmapMark, stageTitle, usePortalStudent } from "@/components/student-portal";
import { useSiteOption } from "@/lib/site-option";

export default function QuarterPage() {
  const { student, toggleCheck } = usePortalStudent();
  const { option } = useSiteOption();
  if (!student) return null;
  const progress = quarterProgress(student);
  const mark = roadmapMark(student.stage);

  return (
    <main className="grid gap-10">
      <header>
        <h1 className="text-3xl">This quarter</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {stageTitle(student.stage)}. The longer road stays in view. The list you work from is these ninety days.
        </p>
        <p className="mt-3 text-sm">{student.objective}</p>
      </header>

      <section>
        <h2 className="text-xl">Next 90 days</h2>
        {progress.total === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nothing is on the list yet. Your counselor writes the next one.</p>
        ) : (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              {progress.done} of {progress.total} done.
            </p>
            <ul className="mt-4 grid gap-2">
              {student.checklist.map((item) => (
                <li key={item.id} className="border border-border bg-card/70 px-4 py-3">
                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={item.done}
                      onChange={() => toggleCheck(student.id, item.id)}
                    />
                    <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl">Already in place</h2>
          {student.strengths.length ? (
            <ul className="mt-3 grid gap-2 text-sm">
              {student.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">Nothing written down yet.</p>
          )}
        </div>
        <div>
          <h2 className="text-xl">Still open</h2>
          {student.gaps.length ? (
            <ul className="mt-3 grid gap-2 text-sm">
              {student.gaps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">Nothing written down yet.</p>
          )}
        </div>
      </section>

      {option === 3 ? (
        <section>
          <h2 className="text-xl">Requirements outside the exam</h2>
          <p className="mt-2 text-sm text-muted-foreground">The office keeps this list. You can see what is open. You cannot mark it done.</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {student.ecfmg.map((item) => (
              <li key={item.item} className="flex flex-wrap justify-between gap-2 border-b border-border/70 py-2">
                <span>{item.item}</span>
                <span className="text-muted-foreground">{item.done ? "Done" : "Open"}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h2 className="text-xl">The longer path</h2>
        <p className="mt-2 text-sm text-muted-foreground">A map. It is not this week’s work.</p>
        <ol className="mt-4 grid gap-2">
          {student.roadmap.map((step, index) => {
            const state = index < mark ? "Behind you" : index === mark ? "Where you are" : "Later";
            return (
              <li
                key={step}
                className={`flex flex-wrap items-center justify-between gap-2 border px-3 py-2 text-sm ${index === mark ? "border-primary bg-card" : "border-border"}`}
              >
                <span className={index < mark ? "text-muted-foreground" : ""}>{step}</span>
                <span className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{state}</span>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
