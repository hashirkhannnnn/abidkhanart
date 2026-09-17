import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WorkRow, { toRows } from "@/components/WorkRow";
import { getWorks } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Works",
  description:
    "The catalogue of paintings by Abid Khan — oil on canvas landscapes of northern Pakistan.",
};

export default async function WorksPage() {
  const works = await getWorks();
  const rows = toRows(works, 2);

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

      <div className="mt-20 flex flex-col gap-y-16 sm:mt-32 sm:gap-y-28">
        {rows.map((row, i) => (
          <Reveal key={row[0].slug}>
            <WorkRow works={row} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
