import Link from "next/link";
import HeroPlates from "@/components/HeroPlates";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import WorkRow, { toRows } from "@/components/WorkRow";
import { site, plates } from "@/content/site";
import { getFeatured, getWorks } from "@/lib/wordpress";

export default async function Home() {
  const [works, featured] = await Promise.all([getWorks(), getFeatured(6)]);

  return (
    <>
      {/* Opening plate — full bleed, uncaptioned, the way a room is
          entered before anything is read. */}
      <section className="h-[clamp(52vh,70vh,46rem)] w-full pt-[var(--header-h)]">
        <HeroPlates paintings={plates.hero} />
      </section>

      {/* The name, set large, on paper rather than over the painting. */}
      <section
        className="px-[var(--gutter)]"
        style={{ paddingBlock: "calc(var(--section) * 0.72)" }}
      >
        <Reveal>
          <h1 className="display text-[clamp(3rem,11vw,9.5rem)]">{site.name}</h1>
          <p className="label mt-6 text-muted">
            {site.discipline}
            <span className="mx-2 opacity-50">·</span>
            {site.born}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="display mt-16 max-w-[26ch] text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.24] italic text-muted sm:mt-24">
            “{site.hook}”
          </p>
        </Reveal>
      </section>

      {/* Selected works — hung in rows at a common height. */}
      <section className="px-[var(--gutter)]">
        <Reveal>
          <h2 className="label border-t border-rule pt-5 text-muted">
            Selected Works
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-y-16 sm:mt-20 sm:gap-y-28">
          {toRows(featured, 2).map((row, i) => (
            <Reveal key={row[0].slug}>
              <WorkRow works={row} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 sm:mt-24">
          <Link href="/works" className="label link-quiet">
            All {works.length} works →
          </Link>
        </Reveal>
      </section>

      {/* A second full-bleed painting, as a pause between rooms. */}
      <section
        className="h-[clamp(38vh,52vh,34rem)] w-full"
        style={{ marginBlock: "var(--section)" }}
      >
        <Plate
          src={plates.interstitial.src}
          alt="Painting by Abid Khan"
          width={plates.interstitial.width}
          height={plates.interstitial.height}
          tone={plates.interstitial.tone}
          sizes="100vw"
          cover
        />
      </section>

      {/* Statement */}
      <section className="px-[var(--gutter)]">
        <Reveal>
          <h2 className="label border-t border-rule pt-5 text-muted">
            Statement
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-12 sm:mt-16">
          <Reveal className="col-span-12 sm:col-span-7 sm:col-start-4">
            {site.statement.map((p) => (
              <p
                key={p}
                className="display mb-7 text-[clamp(1.35rem,2.6vw,2.05rem)] leading-[1.34]"
              >
                {p}
              </p>
            ))}
            <Link href="/about" className="label link-quiet mt-6 inline-block">
              About the artist →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
