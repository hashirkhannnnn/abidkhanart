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
 * The index hangs two works to a row at a common height, dividing each row
 * in proportion to the shapes in it — so `width` and `height` below are what
 * decide how much of a row a painting takes. Nothing is cropped.
 */

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
