import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Viewer from "@/components/Viewer";
import Reveal from "@/components/Reveal";
import { getNeighbours, getWork, getWorks } from "@/lib/wordpress";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getWorks()).map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return {};
  const detail = [work.medium, work.dimensions, work.year].filter(Boolean).join(", ");
  return {
    title: work.title,
    description: `${work.title} — ${detail} — by ${site.name}.`,
    openGraph: { images: [{ url: work.image }] },
  };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const [work, works] = await Promise.all([getWork(slug), getWorks()]);
  if (!work) notFound();

  const { prev, next } = await getNeighbours(slug);
  const details = [work.year, work.medium, work.dimensions].filter(Boolean);

  return (
    <article className="px-[var(--gutter)] pt-[20vh] sm:pt-[24vh]">
      {/* The painting and its label share one frame, so the label always
          begins at the painting's own left edge. The frame is sized to the
          painting's shape — tall enough to be seen whole without scrolling,
          never narrower than a comfortable measure for the caption. */}
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: `min(100%, max(26rem, calc(var(--plate-h) * ${work.width} / ${work.height})))`,
        }}
      >
      <Reveal>
        <Viewer work={work} works={works} />
      </Reveal>

      {/* Wall label */}
      <Reveal delay={0.1}>
        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 sm:mt-12">
          <div className="col-span-12 sm:col-span-7">
            <h1 className="display text-[clamp(1.85rem,4.5vw,3rem)] italic">
              {work.title}
            </h1>
            {details.length > 0 && (
              <p className="label mt-4 text-muted">{details.join(" · ")}</p>
            )}
            <p className="label mt-3 text-muted opacity-60">
              <span className="loupe-hint">Move across to look closer</span>
              <span className="loupe-hint mx-2 opacity-50">·</span>
              Click to enlarge
            </p>
          </div>

          {work.text && work.text.length > 0 && (
            <div className="col-span-12">
              {work.text.map((p) => (
                <p key={p} className="mb-5 max-w-[54ch] text-muted">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {/* Enquiry */}
      <Reveal delay={0.15}>
        <div className="mt-12 border-t border-rule pt-6">
          <Link href="/contact" className="label link-quiet">
            Enquire about this work →
          </Link>
        </div>
      </Reveal>

      </div>

      {/* Previous / next — full width, beneath the frame */}
      <nav
        className="flex items-baseline justify-between gap-6 border-t border-rule pt-6"
        style={{ marginTop: "calc(var(--section) * 0.6)" }}
      >
        {prev ? (
          <Link href={`/works/${prev.slug}`} className="label link-quiet max-w-[45%]">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/works" className="label link-quiet text-muted">
          Index
        </Link>
        {next ? (
          <Link
            href={`/works/${next.slug}`}
            className="label link-quiet max-w-[45%] text-right"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
