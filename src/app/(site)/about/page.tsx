import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <PageTitle
        eyebrow="About"
        title="We are FutureMdUSA."
        lede="A physician-led practice for Indian medical students who want a U.S. residency. Dr. Faiz leads it."
      />
      <div className="mx-auto grid max-w-5xl items-start gap-10 px-5 pb-20 md:grid-cols-[0.9fr_1.1fr]">
        <Image
          src="/about-desk.jpg"
          alt="A stethoscope beside an open laptop"
          width={1800}
          height={1200}
          className="h-auto w-full object-cover"
        />
        <div className="grid gap-10">
          <section>
            <h2 className="text-2xl">FutureMdUSA</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We stay with a student from the first question about USMLE through the Match. This is not a coaching center that sells a package and leaves the rest to the student. The student should always be able to say where they are, what to do now, and what the next milestone is.
            </p>
          </section>
          <section>
            <h2 className="text-2xl">Dr. Faiz</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Dr. Faiz is the U.S. physician who founded FutureMdUSA. He leads the medical side of the journey: whether this path fits, how the student should prepare, and whether the profile and the application are honest. Students get a physician’s judgment, not a generic study plan.
            </p>
          </section>
          <section>
            <h2 className="text-2xl">What we do</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We start from the stage the student is actually in. Early on, that means understanding USMLE and learning how to study. Later, it means real clinical time in the United States and a profile built from work the student has done. Near the end, it means the residency application: credentials, programs that fit, interviews, and the rank list.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              A letter is written only after a physician has seen the student work. We do not promise a Match, an interview, or a visa.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
