/**
 * The catalogue.
 * ──────────────────────────────────────────────────────────────
 * To add a work:
 *   1. Drop the photograph into  public/works/  (JPG, long edge ~2400px)
 *   2. Add an entry below. The order of this array is the order of the hang.
 *
 * `year` and `dimensions` are blank because the old site did not record
 * them — fill them in and they appear on the wall labels automatically.
 * Leave them empty and they are simply left out.
 *
 * `tone` is the colour held behind the photograph while it loads, sampled
 * from the painting itself, so a page never flashes white.
 *
 * `span` sets how much of the row a work takes in the index:
 *   "full"   — edge to edge, alone on its row
 *   "wide"   — two thirds
 *   "half"   — half
 *   "narrow" — a small inset column
 */

export type Span = "full" | "wide" | "half" | "narrow";

export type Work = {
  slug: string;
  title: string;
  /** e.g. "2019". Blank until recorded. */
  year: string;
  medium: string;
  /** e.g. "90 × 60 cm". Blank until recorded. */
  dimensions: string;
  image: string;
  width: number;
  height: number;
  tone: string;
  span: Span;
  /** Shown on the home page. Aim for 6–8. */
  featured?: boolean;
  /** Paragraphs shown on the work's own page. Optional. */
  text?: string[];
};

export const works: Work[] = [
  {
    slug: "where-the-road-softens",
    title: "Where the Road Softens",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/where-the-road-softens.jpg",
    width: 922,
    height: 1253,
    tone: "#869989",
    span: "half",
    featured: true,
  },
  {
    slug: "meadow-of-whispering-light",
    title: "Meadow of Whispering Light",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/meadow-of-whispering-light.jpg",
    width: 1200,
    height: 897,
    tone: "#6a8789",
    span: "half",
    featured: true,
  },
  {
    slug: "silence-of-autumn",
    title: "Silence of Autumn",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/silence-of-autumn.jpg",
    width: 897,
    height: 1200,
    tone: "#9c9461",
    span: "half",
    featured: true,
  },
  {
    slug: "cold-light-endless-hills",
    title: "Cold Light, Endless Hills",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/cold-light-endless-hills.jpg",
    width: 776,
    height: 1031,
    tone: "#7e98ab",
    span: "half",
  },
  {
    slug: "the-language-of-wildflowers",
    title: "The Language of Wildflowers",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/the-language-of-wildflowers.jpg",
    width: 870,
    height: 1200,
    tone: "#6f858a",
    span: "narrow",
    featured: true,
  },
  {
    slug: "morning-walk-distant-hills",
    title: "Morning Walk, Distant Hills",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/morning-walk-distant-hills.jpg",
    width: 1600,
    height: 1098,
    tone: "#91a490",
    span: "half",
    featured: true,
  },
  {
    slug: "petals-and-passing-hours",
    title: "Petals and Passing Hours",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/petals-and-passing-hours.jpg",
    width: 890,
    height: 1200,
    tone: "#748279",
    span: "half",
  },
  {
    slug: "winters-quiet-river",
    title: "Winter’s Quiet River",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/winters-quiet-river.jpg",
    width: 846,
    height: 1200,
    tone: "#788b9b",
    span: "half",
    featured: true,
  },
  {
    slug: "untitled-spring-field",
    title: "Untitled (Spring Field)",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/untitled-spring-field.jpg",
    width: 1200,
    height: 962,
    tone: "#667e66",
    span: "half",
  },
  {
    slug: "village-in-passing-light",
    title: "Village in Passing Light",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/village-in-passing-light.jpg",
    width: 914,
    height: 1200,
    tone: "#7c859c",
    span: "narrow",
  },
  {
    slug: "the-earth-speaks-softly",
    title: "The Earth Speaks Softly",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/the-earth-speaks-softly.jpg",
    width: 889,
    height: 1200,
    tone: "#7892a0",
    span: "half",
  },
  {
    slug: "quiet-growth",
    title: "Quiet Growth",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/quiet-growth.jpg",
    width: 885,
    height: 1200,
    tone: "#857e73",
    span: "half",
  },
  {
    slug: "breath-of-early-summer",
    title: "Breath of Early Summer",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/breath-of-early-summer.jpg",
    width: 1407,
    height: 1049,
    tone: "#808d77",
    span: "wide",
  },
  {
    slug: "silence-in-motion",
    title: "Silence in Motion",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/silence-in-motion.jpg",
    width: 877,
    height: 1200,
    tone: "#7a8895",
    span: "half",
  },
  {
    slug: "where-days-move-slowly",
    title: "Where Days Move Slowly",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/where-days-move-slowly.jpg",
    width: 1035,
    height: 1200,
    tone: "#89ab9b",
    span: "narrow",
  },
  {
    slug: "a-landscape-holding-breath",
    title: "A Landscape Holding Breath",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/a-landscape-holding-breath.jpg",
    width: 450,
    height: 515,
    tone: "#6c8c88",
    span: "narrow",
  },
  {
    slug: "cold-breeze-night",
    title: "Cold breeze night",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/cold-breeze-night.jpg",
    width: 1200,
    height: 896,
    tone: "#577ba0",
    span: "half",
    featured: true,
  },
  {
    slug: "between-rain-and-silence",
    title: "Between Rain and Silence",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/between-rain-and-silence.jpg",
    width: 897,
    height: 1200,
    tone: "#809795",
    span: "half",
  },
  {
    slug: "lillies",
    title: "Lillies",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/lillies.jpg",
    width: 1200,
    height: 881,
    tone: "#7d7594",
    span: "wide",
  },
  {
    slug: "field-of-unspoken-colors",
    title: "Field of Unspoken Colors",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/field-of-unspoken-colors.jpg",
    width: 1200,
    height: 1024,
    tone: "#98a2a7",
    span: "half",
  },
  {
    slug: "held-by-the-season",
    title: "Held by the Season",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/held-by-the-season.jpg",
    width: 900,
    height: 1200,
    tone: "#738c7b",
    span: "half",
  },
  {
    slug: "stillness",
    title: "Stillness",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/stillness.jpg",
    width: 1200,
    height: 873,
    tone: "#516796",
    span: "full",
  },
  {
    slug: "day-after-rain",
    title: "Day after rain",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/day-after-rain.jpg",
    width: 876,
    height: 1200,
    tone: "#85828d",
    span: "half",
  },
  {
    slug: "untitled",
    title: "Untitled",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/untitled.jpg",
    width: 1200,
    height: 888,
    tone: "#949a9b",
    span: "half",
  },
  {
    slug: "a-landscape-holding-breath1",
    title: "A Landscape Holding Breath1",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/a-landscape-holding-breath1.jpg",
    width: 1200,
    height: 893,
    tone: "#758f8e",
    span: "wide",
  },
  {
    slug: "nature-uninterrupted",
    title: "Nature, Uninterrupted",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/nature-uninterrupted.jpg",
    width: 285,
    height: 244,
    tone: "#6d8b83",
    span: "narrow",
  },
  {
    slug: "village-beneath-the-clouds",
    title: "Village Beneath the Clouds",
    year: "",
    medium: "Oil on canvas",
    dimensions: "",
    image: "/works/village-beneath-the-clouds.jpg",
    width: 285,
    height: 202,
    tone: "#80928a",
    span: "narrow",
  },];

/* ── helpers ─────────────────────────────────────────────────── */

export const featuredWorks = works.filter((w) => w.featured);

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}

/** Previous and next in catalogue order, wrapping at both ends. */
export function getNeighbours(slug: string) {
  const i = works.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: works[(i - 1 + works.length) % works.length],
    next: works[(i + 1) % works.length],
  };
}
