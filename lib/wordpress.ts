import "server-only";
import { fallbackWorks, type Work } from "@/content/works";
import tones from "@/content/tones.json";

/**
 * The catalogue, read from WordPress.
 * ──────────────────────────────────────────────────────────────
 * Paintings live in the `art` post type: the title and the featured image
 * are all that is required, and anything else the site shows — year,
 * dimensions, medium, a note — comes from custom fields if they exist.
 *
 * If WordPress cannot be reached the committed snapshot in content/works.ts
 * is served instead, so an outage at the CMS can never take the gallery
 * down; it only means the catalogue is as of the last deploy.
 */

const WP = (process.env.WORDPRESS_URL ?? "https://abidkhanart.com").replace(/\/$/, "");

/** How long a fetched catalogue is served before being checked again. */
const REVALIDATE = 300;

type WpMedia = {
  source_url?: string;
  media_details?: { width?: number; height?: number };
};

type WpArt = {
  id: number;
  slug: string;
  date: string;
  menu_order?: number;
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: Record<string, unknown> | unknown[];
  _embedded?: { "wp:featuredmedia"?: WpMedia[] };
};

/** WordPress returns titles with entities in them; the site wants the text. */
function decode(html: string) {
  return html
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

/** Strip the "-2"/"-3" WordPress appends to a re-used slug. */
const tidySlug = (slug: string) => slug.replace(/-\d+$/, "") || slug;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** ACF returns [] rather than {} when a post has no fields set. */
const fields = (a: WpArt) =>
  a.acf && !Array.isArray(a.acf) ? (a.acf as Record<string, unknown>) : {};

/**
 * A neutral stand-in for a painting whose colour has not been sampled yet.
 * A new work added in WordPress uses this until `npm run sync` records its
 * real tone — it only affects the colour held behind the image while it
 * loads, so it is never wrong in a way a visitor would notice.
 */
const NEUTRAL_TONE = "#9a9790";

const toneFor = (slug: string, original: string) =>
  (tones as Record<string, string>)[slug] ??
  (tones as Record<string, string>)[original] ??
  NEUTRAL_TONE;

function toWork(a: WpArt, taken: Set<string>): Work | null {
  const media = a._embedded?.["wp:featuredmedia"]?.[0];
  const image = media?.source_url;
  const width = media?.media_details?.width;
  const height = media?.media_details?.height;

  // A painting with no photograph has nothing to hang.
  if (!image || !width || !height) return null;

  let slug = tidySlug(a.slug);
  if (taken.has(slug)) slug = a.slug; // keep WordPress's own if tidying collides
  taken.add(slug);

  const f = fields(a);
  const body = decode((a.content?.rendered ?? "").replace(/<[^>]+>/g, "\n"));

  return {
    slug,
    title: decode(a.title?.rendered ?? "Untitled") || "Untitled",
    year: str(f.year) || (typeof f.year === "number" ? String(f.year) : ""),
    medium: str(f.medium) || "Oil on canvas",
    dimensions: str(f.dimensions),
    image,
    width,
    height,
    tone: str(f.tone) || toneFor(slug, a.slug),
    featured: f.featured === true || f.featured === "1" || f.featured === 1,
    text: body ? body.split("\n").map((p) => p.trim()).filter(Boolean) : undefined,
  };
}

/** Fetches the catalogue in the order WordPress hangs it. */
export async function getWorks(): Promise<Work[]> {
  try {
    const res = await fetch(
      `${WP}/wp-json/wp/v2/art?per_page=100&_embed=wp:featuredmedia&orderby=menu_order&order=asc`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) throw new Error(`WordPress replied ${res.status}`);

    const data = (await res.json()) as WpArt[];
    const taken = new Set<string>();
    const works = data.map((a) => toWork(a, taken)).filter((w): w is Work => w !== null);

    if (works.length === 0) throw new Error("WordPress returned no paintings");
    return works;
  } catch (err) {
    console.warn(
      `[wordpress] falling back to the committed catalogue — ${(err as Error).message}`,
    );
    return fallbackWorks;
  }
}

export async function getWork(slug: string) {
  return (await getWorks()).find((w) => w.slug === slug);
}

/** Previous and next in hanging order, wrapping at both ends. */
export async function getNeighbours(slug: string) {
  const works = await getWorks();
  const i = works.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: works[(i - 1 + works.length) % works.length],
    next: works[(i + 1) % works.length],
  };
}

/**
 * The works shown on the home page. If nothing has been flagged in
 * WordPress, the first six stand in, so the page is never empty.
 */
export async function getFeatured(count = 6) {
  const works = await getWorks();
  const flagged = works.filter((w) => w.featured);
  return (flagged.length > 0 ? flagged : works).slice(0, count);
}
