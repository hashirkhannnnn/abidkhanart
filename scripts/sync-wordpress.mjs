/**
 * Refreshes the offline fallback from WordPress.
 *
 *   npm run sync
 *
 * The live site reads WordPress directly; this only updates what it falls
 * back to when WordPress cannot be reached. It pulls the catalogue, caches
 * each photograph into public/works/ so the fallback needs nothing from the
 * network, samples each painting's dominant colour, and rewrites
 * content/works.ts and content/tones.json.
 *
 * Run it after adding paintings in WordPress, then commit the result.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const WP = (process.env.WORDPRESS_URL ?? "https://abidkhanart.com").replace(/\/$/, "");
const OUT = path.join(process.cwd(), "public", "works");
const MAX_EDGE = 2400;

const decode = (s = "") =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&apos;|&#039;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    .trim();

const tidySlug = (s) => s.replace(/-\d+$/, "") || s;
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
const str = (v) => (typeof v === "string" ? v.trim() : "");

/** Average colour, pulled slightly darker so pale paintings don't flash white. */
async function tone(buf) {
  const { data, info } = await sharp(buf)
    .resize(8, 8, { fit: "cover" }).removeAlpha()
    .raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < n; i++) { r += data[i * 3]; g += data[i * 3 + 1]; b += data[i * 3 + 2]; }
  const f = (x) => Math.round((x / n) * 0.93).toString(16).padStart(2, "0");
  return `#${f(r)}${f(g)}${f(b)}`;
}

const url = `${WP}/wp-json/wp/v2/art?per_page=100&_embed=wp:featuredmedia&orderby=menu_order&order=asc`;
console.log(`Reading ${WP} …`);

const res = await fetch(url);
if (!res.ok) {
  console.error(`WordPress replied ${res.status}. Nothing written.`);
  process.exit(1);
}
const posts = await res.json();
fs.mkdirSync(OUT, { recursive: true });

const taken = new Set();
const works = [];
const tones = {};

for (const post of posts) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const src = media?.source_url;
  if (!src) {
    console.warn(`  skipped "${decode(post.title?.rendered)}" — no featured image`);
    continue;
  }

  let slug = tidySlug(post.slug);
  if (taken.has(slug)) slug = post.slug;
  taken.add(slug);

  const img = await fetch(src);
  if (!img.ok) {
    console.warn(`  skipped ${slug} — image returned ${img.status}`);
    continue;
  }
  const raw = Buffer.from(await img.arrayBuffer());

  const meta = await sharp(raw).metadata();
  const scale = Math.min(1, MAX_EDGE / Math.max(meta.width, meta.height));
  const width = Math.round(meta.width * scale);
  const height = Math.round(meta.height * scale);

  const out = await sharp(raw).rotate().resize(width, height)
    .jpeg({ quality: 86, chromaSubsampling: "4:4:4", mozjpeg: true }).toBuffer();
  fs.writeFileSync(path.join(OUT, `${slug}.jpg`), out);

  const f = post.acf && !Array.isArray(post.acf) ? post.acf : {};
  const colour = str(f.tone) || (await tone(out));
  tones[slug] = colour;

  works.push({
    slug,
    title: decode(post.title?.rendered) || "Untitled",
    year: str(f.year) || (typeof f.year === "number" ? String(f.year) : ""),
    medium: str(f.medium) || "Oil on canvas",
    dimensions: str(f.dimensions),
    width,
    height,
    tone: colour,
    featured: f.featured === true || f.featured === "1" || f.featured === 1,
  });

  console.log(`  ${slug}  ${width}×${height}  ${colour}`);
}

if (works.length === 0) {
  console.error("No paintings found. Nothing written.");
  process.exit(1);
}

const header = fs
  .readFileSync(path.join(process.cwd(), "content", "works.ts"), "utf8")
  .split("export const fallbackWorks")[0];

const body = works
  .map(
    (w) => `  {
    slug: "${esc(w.slug)}",
    title: "${esc(w.title)}",
    year: "${esc(w.year)}",
    medium: "${esc(w.medium)}",
    dimensions: "${esc(w.dimensions)}",
    image: "/works/${w.slug}.jpg",
    width: ${w.width},
    height: ${w.height},
    tone: "${w.tone}",${w.featured ? "\n    featured: true," : ""}
  },`,
  )
  .join("\n");

fs.writeFileSync(
  path.join(process.cwd(), "content", "works.ts"),
  `${header}export const fallbackWorks: Work[] = [\n${body}\n];\n`,
);
fs.writeFileSync(
  path.join(process.cwd(), "content", "tones.json"),
  `${JSON.stringify(Object.fromEntries(Object.entries(tones).sort()), null, 1)}\n`,
);

console.log(`\n${works.length} paintings synced. Commit content/ and public/works/.`);
