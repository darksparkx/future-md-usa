import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "For parents" };

const blocks = [
  {
    title: "What USMLE is",
    body: "The United States Medical Licensing Examination is a set of exams international graduates use on the way to a U.S. residency. Step 1 and Step 2 CK are the medical-science exams. They are necessary work. They are not, by themselves, a residency.",
  },
  {
    title: "Timeline",
    body: "A student who starts early in medical school is on a multi-year path: foundation, Step 1, Step 2 CK, U.S. clinical experience, applications, interviews, and the Match. A student who is already a graduate moves faster through the early stages and spends the time on exams, credentials, and the application. We will not quote a single calendar for every family.",
  },
  {
    title: "Costs",
    body: "Exam fees, travel, rotations, applications, and living costs sit outside the consultancy package. Package fees are confirmed after an assessment, because a beginner and an applicant are not buying the same months of work. This preview shows sample package amounts only.",
  },
  {
    title: "Risks",
    body: "Students can fail an attempt, wait a cycle, or decide the path is not theirs. Programs change what they publish. Visa rules change. A strong plan reduces wasted motion. It does not remove the risk.",
  },
  {
    title: "What we do",
    body: "We assess the stage, write the next 90 days, teach a study method, coordinate genuine U.S. clinical experience when it is time, and review applications before they go out. The India office runs the relationship. U.S. physicians hold the clinical and residency judgment.",
  },
  {
    title: "What we cannot promise",
    body: "A Match, an interview, a letter of recommendation, or a visa. We also will not invent research, rewrite a transcript, or tell you a program “never takes IMGs” without a source and a date.",
  },
  {
    title: "What the student owns",
    body: "The hours, the honesty of the record, and the decision to continue. We can name the next action. We cannot sit the exam.",
  },
];

export default function ParentsPage() {
  return (
    <main>
      <PageTitle
        eyebrow="For parents"
        title="What every parent should know."
        lede="Not understated, not exaggerated. Just the facts."
      />
      <div className="mx-auto max-w-3xl px-5 pb-20">
        {blocks.map((block) => (
          <section key={block.title} className="border-t border-border py-7">
            <h2 className="text-2xl">{block.title}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{block.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
