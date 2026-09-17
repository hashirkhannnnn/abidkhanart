/**
 * Prepares photographs for the site and prints the catalogue entries.
 *
 *   node scripts/add-works.mjs ~/Desktop/new-paintings
 *
 * For each image in the folder it writes a web-ready JPG into
 * public/works/ and prints a ready-made block to paste into
 * content/works.ts — with the real dimensions and the painting's own
 * dominant colour already filled in.
 *
 * The file name becomes the slug and the title, so name them well:
 *   "Winter's Quiet River.jpg"  ->  winters-quiet-river
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const src = process.argv[2];
if (!src) {
  console.error("Usage: node scripts/add-works.mjs <folder-of-images>");
  process.exit(1);
}

const OUT = path.join(process.cwd(), "public", "works");
fs.mkdirSync(OUT, { recursive: true });

const MAX_EDGE = 2400; // plenty for a full-width plate on a retina screen

const slugify = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const titleFrom = (name) => name.replace(/\.[^.]+$/, "").trim();

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

const files = fs
  .readdirSync(src)
  .filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f))
  .sort();

if (files.length === 0) {
  console.error(`No images found in ${src}`);
  process.exit(1);
}

const entries = [];
for (const file of files) {
  const slug = slugify(file);
  const meta = await sharp(path.join(src, file)).rotate().metadata();
  const scale = Math.min(1, MAX_EDGE / Math.max(meta.width, meta.height));
  const width = Math.round(meta.width * scale);
  const height = Math.round(meta.height * scale);

  const buf = await sharp(path.join(src, file))
    .rotate()
    .resize(width, height)
    .jpeg({ quality: 86, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(path.join(OUT, `${slug}.jpg`), buf);

  const landscape = width >= height;
  entries.push(`  {
    slug: "${slug}",
    title: "${titleFrom(file).replace(/"/g, '\\"')}",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/${slug}.jpg",
    width: ${width},
    height: ${height},
    tone: "${await tone(buf)}",
    span: "${landscape ? "wide" : "half"}",
  },`);

  console.error(`  wrote public/works/${slug}.jpg  ${width}×${height}  ${(buf.length / 1024) | 0} KB`);
}

console.error(`\n── paste into content/works.ts ──\n`);
console.log(entries.join("\n"));
