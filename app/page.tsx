import Link from "next/link";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import WorkLink from "@/components/WorkLink";
import { site, plates } from "@/content/site";
import { featuredWorks, works } from "@/content/works";

export default function Home() {
  // The home page hangs its first six selected works in a fixed rhythm;
  // anything beyond that waits on the index.
  const [a, b, c, d, e, f] = featuredWorks;

  return (
    <>
      {/* Opening plate — full bleed, uncaptioned, the way a room is
          entered before anything is read. */}
      <section className="h-[clamp(62vh,80vh,54rem)] w-full pt-[var(--header-h)]">
        <Plate
          src={plates.hero.src}
          alt="Painting by Abid Khan"
          width={plates.hero.width}
          height={plates.hero.height}
          tone={plates.hero.tone}
          sizes="100vw"
          priority
          cover
        />
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

      {/* Selected works — an asymmetric hang, not a uniform grid. */}
      <section className="px-[var(--gutter)]">
        <Reveal>
          <h2 className="label border-t border-rule pt-5 text-muted">
            Selected Works
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-16 sm:mt-20 sm:gap-y-28">
          {a && (
            <Reveal className="col-span-12 sm:col-span-7">
              <WorkLink work={a} sizes="(max-width: 640px) 100vw, 58vw" priority full />
            </Reveal>
          )}
          {b && (
            <Reveal
              delay={0.08}
              className="col-span-12 sm:col-span-4 sm:col-start-9 sm:self-end"
            >
              <WorkLink work={b} sizes="(max-width: 640px) 100vw, 33vw" />
            </Reveal>
          )}
          {c && (
            <Reveal className="col-span-12 sm:col-span-5 sm:col-start-2">
              <WorkLink work={c} sizes="(max-width: 640px) 100vw, 42vw" />
            </Reveal>
          )}
          {d && (
            <Reveal delay={0.08} className="col-span-12 sm:col-span-5 sm:col-start-8">
              <WorkLink work={d} sizes="(max-width: 640px) 100vw, 42vw" />
            </Reveal>
          )}
          {e && (
            <Reveal className="col-span-12 sm:col-span-8 sm:col-start-3">
              <WorkLink work={e} sizes="(max-width: 640px) 100vw, 66vw" full />
            </Reveal>
          )}
          {f && (
            <Reveal className="col-span-12 sm:col-span-4 sm:col-start-2">
              <WorkLink work={f} sizes="(max-width: 640px) 100vw, 33vw" />
            </Reveal>
          )}
        </div>

        <Reveal className="mt-16 sm:mt-24">
          <Link href="/works" className="label link-quiet">
            All {works.length} works →
          </Link>
        </Reveal>
      </section>

      {/* A second full-bleed painting, as a pause between rooms. */}
      <section
        className="h-[clamp(45vh,62vh,40rem)] w-full"
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
