import type { Metadata } from "next";
import Link from "next/link";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { education, milestones, plates, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — ${site.born}. Landscape painter working in oil on canvas in Islamabad.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="px-[var(--gutter)] pt-[28vh] sm:pt-[32vh]">
        <Reveal>
          <h1 className="display text-[clamp(2.75rem,9vw,7rem)]">
            About the artist
          </h1>
          <p className="label mt-6 text-muted">
            {site.born}
            <span className="mx-2 opacity-50">·</span>
            Lives and works in {site.location}
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16 sm:mt-28">
          {/* Biography */}
          <Reveal className="col-span-12 sm:col-span-6 sm:col-start-1">
            {site.biography.map((p, i) => (
              <p
                key={p}
                className={
                  i === 0
                    ? "display mb-7 text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.36]"
                    : "mb-5 max-w-[46ch] text-muted"
                }
              >
                {p}
              </p>
            ))}
          </Reveal>

          {/* A painting beside the text, and the short facts under it */}
          <Reveal delay={0.1} className="col-span-12 sm:col-span-4 sm:col-start-9">
            <Plate
              src={plates.about.src}
              alt={`Painting by ${site.name}`}
              width={plates.about.width}
              height={plates.about.height}
              tone={plates.about.tone}
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <ul className="mt-8 space-y-3">
              {site.facts.map((f) => (
                <li key={f} className="label border-t border-rule pt-3 text-muted">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Statement, in the artist's voice */}
      <section
        className="px-[var(--gutter)]"
        style={{ marginTop: "var(--section)" }}
      >
        <Reveal>
          <h2 className="label border-t border-rule pt-5 text-muted">
            Artist Statement
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-12 sm:mt-16">
          <Reveal className="col-span-12 sm:col-span-7 sm:col-start-4">
            {site.artistStatement.map((p, i) => (
              <p
                key={p}
                className={
                  i === 0
                    ? "display mb-7 text-[clamp(1.35rem,2.6vw,2.05rem)] leading-[1.34]"
                    : "mb-5 max-w-[52ch] text-muted"
                }
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Exhibitions and milestones */}
      <section
        className="px-[var(--gutter)]"
        style={{ marginTop: "var(--section)" }}
      >
        <Reveal>
          <h2 className="label border-t border-rule pt-5 text-muted">
            Exhibitions &amp; Milestones
          </h2>
        </Reveal>

        <dl className="mt-12 sm:mt-16">
          {milestones.map((m, i) => (
            <Reveal
              key={m.year + m.title}
              delay={Math.min(i * 0.04, 0.24)}
              className="grid grid-cols-12 gap-x-6 border-b border-rule py-6"
            >
              <dt className="label col-span-3 text-muted sm:col-span-2">
                {m.year}
              </dt>
              <dd className="col-span-9 sm:col-span-9 sm:col-start-3">
                <span className="font-display text-[1.25rem] italic">
                  {m.title}
                </span>
                <span className="mt-1 block max-w-[52ch] text-[0.875rem] text-muted">
                  {m.detail}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-16">
          <h3 className="label text-muted">Education</h3>
          <dl className="mt-6">
            {education.map((e) => (
              <div
                key={e.year}
                className="grid grid-cols-12 gap-x-6 border-t border-rule py-5"
              >
                <dt className="label col-span-3 text-muted sm:col-span-2">
                  {e.year}
                </dt>
                <dd className="col-span-9 text-[0.9375rem] sm:col-start-3">
                  {e.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-16">
          <Link href="/works" className="label link-quiet">
            See the works →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
