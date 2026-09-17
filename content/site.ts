/**
 * Site-wide content.
 * ──────────────────────────────────────────────────────────────
 * Everything a visitor reads outside the catalogue lives here.
 * Text is carried over from abidkhanart.com and lightly edited for the
 * shorter, quieter register this design asks for.
 */

export const site = {
  name: "Abid Khan",
  /** Under the name in the hero and the footer. */
  discipline: "Landscape Painter",
  location: "Islamabad, Pakistan",
  born: "b. Lahore, 1966",

  meta: {
    title: "Abid Khan",
    description:
      "Pakistani landscape painter working in oil on canvas. Soft brushwork, layered colour and the quiet weather of the northern valleys.",
    /** Update once the domain points here. */
    url: "https://abidkhanart.com",
  },

  /** The line under the hero image. Kept to one sentence on purpose. */
  hook:
    "Nature practises no discrimination. That is exactly why she deserves to be the subject of my canvases.",

  /** Home page, beneath the selected works. Two short paragraphs. */
  statement: [
    "I live and work in Islamabad, striving to represent the true picture of this land, having absorbed its beauty onto the canvas of my imagination.",
    "I find love, peace and harmony in the romantic and classical dance of natural splendours — from the songs of the nightingale in spring to the calm stillness of winter.",
  ],

  /** /about — the long text. Each string is a paragraph. */
  biography: [
    "Abid Khan was born in Lahore in 1966. His early life was spent working alongside his optician father, but his attention was always on painting and drawing.",
    "Without the resources for a formal art education, he pursued the practice independently while reading for a Master’s degree in English Literature, which he completed at Punjab University in 1993. That grounding in classical and modern literature sharpened rather than satisfied the need for pictorial expression, and he turned to painting entirely.",
    "He works in oil on canvas, using Sennelier paints, building a landscape in layers of small strokes until the atmosphere of a particular hour settles on the surface. The subjects are the valleys, orchards, meadows and winter villages of northern Pakistan, returned to season after season.",
    "Over more than two decades he has held ten solo exhibitions and taken part in eleven group shows, in Pakistan and abroad. His paintings have been auctioned at Christie’s in London, shown in Singapore, Germany, Dubai, Oman, Japan, the United States and the United Kingdom, and are held in private and permanent collections worldwide.",
  ],

  /** /about — the statement page, in the artist's own voice. */
  artistStatement: [
    "To me, art is a universal visual language. I am not looking for artificial glamour, but for originality and the natural manifestation of the environment. I use colour to reflect atmosphere and to catch the multihued, misty moments that invite the viewer into nature’s solace.",
    "More or less all forms of art communicate a message, but a painting done with purity of heart and soul can move this world emotionally and psychologically. When the tiny strokes painted by an inspired brush are blended into one another, in several layers, you see the true picture of humanity and love.",
    "I feel love, peace and harmony in this romantic and classical dance of natural splendours: the songs of the nightingale in spring, the whispering breeze of summer, the calm weather of winter, and the withering colours of autumn. I constantly look for beauty and harmony around me in this city of gardens. Nature smiles at me when I pass by.",
    "The struggles and hardships of life only boost my spirit to create better work. How wonderful it is for a painter to live and paint without discrimination on the basis of language, religion or region.",
  ],

  /** Short facts listed beside the biography. */
  facts: [
    "Oil on canvas, Sennelier paints",
    "10 solo exhibitions, 11 group shows",
    "Auctioned at Christie’s, London",
    "Collected in the USA, Europe, the Middle East and Asia",
    "Art residencies in northern Pakistan on climate change",
  ],

  contact: {
    /**
     * The old site listed no email address. Add one here and it will
     * appear on the contact page and in the footer automatically.
     */
    email: "",
    phones: ["781-562-9355", "781-727-6090"],
    city: "Islamabad, Pakistan",
    note: "For enquiries, commissions or exhibition details, please get in touch. Collectors, galleries and visitors are all welcome to write about available works.",
  },

  /**
   * The old site's social icons pointed nowhere. Add real links here
   * and they appear in the footer; leave the list empty and it is hidden.
   */
  social: [] as { label: string; href: string }[],

  /** Commissions — shown on /contact. */
  commission: [
    "Each commission is an original painting in oil on canvas, developed with attention to mood, atmosphere and balance.",
    "Dimensions, themes and colour tones are discussed beforehand so the finished work suits the room it is made for.",
  ],
} as const;

/** /about — exhibitions and milestones, newest first. */
export const milestones = [
  {
    year: "2025",
    title: "Presented by the Government of Pakistan",
    detail: "Work presented to World Bank President Ajay Banga, Washington D.C.",
  },
  {
    year: "2023",
    title: "The Golf Scene",
    detail: "Private collection of David Kohler, USA.",
  },
  {
    year: "2020",
    title: "Award of Excellence",
    detail:
      "Artists Association of Punjab, 34th Annual Art Exhibition, in recognition of artistic merit and contribution to contemporary art.",
  },
  {
    year: "2017",
    title: "My Garden",
    detail: "Permanent collection, Japan.",
  },
  {
    year: "2015",
    title: "Colours in Harmony",
    detail: "Group exhibition of contemporary art from Pakistan; and Spectrum, Oman.",
  },
  {
    year: "2013",
    title: "Christie’s, London",
    detail: "A painting auctioned by the house — the artist’s first international sale at auction.",
  },
  {
    year: "2005",
    title: "Solo exhibition",
    detail: "Galleria Corner Cafe, Dubai.",
  },
  {
    year: "2002",
    title: "Hazy Moments",
    detail: "Permanent collection, Germany.",
  },
  {
    year: "1999",
    title: "Group exhibition",
    detail: "Notices Art Gallery, Singapore.",
  },
] as const;

export const education = [
  { year: "1993", detail: "MA English Literature, Punjab University, Lahore" },
] as const;

/**
 * Large uncaptioned photographs used for the hero and the full-bleed
 * breaks between sections. These are paintings from the studio archive
 * (public/paintings/) that are not yet in the titled catalogue.
 */
export const plates = {
  /**
   * The opening plate slowly gives way to the next, and round again.
   * Reduce this to a single entry and it simply holds still.
   */
  hero: [
    { src: "/paintings/p01.jpg", width: 2400, height: 1793, tone: "#89929c" },
    { src: "/paintings/p19.jpg", width: 2400, height: 1788, tone: "#82979e" },
    { src: "/paintings/p28.jpg", width: 2400, height: 1806, tone: "#677a95" },
  ],
  interstitial: { src: "/paintings/p25.jpg", width: 2400, height: 1433, tone: "#597a9f" },
  about: { src: "/paintings/p13.jpg", width: 1790, height: 2400, tone: "#8c95a4" },
  contact: { src: "/paintings/p16.jpg", width: 2400, height: 1820, tone: "#94889d" },
} as const;
