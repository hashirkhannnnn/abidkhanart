import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WorkLink from "@/components/WorkLink";
import { works } from "@/content/works";
import { gridClass, sizesFor } from "@/lib/grid";

export const metadata: Metadata = {
  title: "Works",
  description:
    "The catalogue of paintings by Abid Khan — oil on canvas landscapes of northern Pakistan.",
};

export default function WorksPage() {
  return (
    <section className="px-[var(--gutter)] pt-[28vh] sm:pt-[32vh]">
      <Reveal>
        <h1 className="display text-[clamp(2.75rem,9vw,7rem)]">Works</h1>
        <p className="label mt-6 text-muted">
          {works.length} paintings
          <span className="mx-2 opacity-50">·</span>
          Oil on canvas
        </p>
      </Reveal>

      <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16 sm:mt-32 sm:gap-y-32">
        {works.map((work, i) => (
          <Reveal key={work.slug} className={gridClass(work.span, i)}>
            <WorkLink
              work={work}
              sizes={sizesFor(work.span)}
              priority={i < 2}
              full={work.span === "full" || work.span === "wide"}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
