import type { Span } from "@/content/works";

/**
 * Turns a work's span into grid classes.
 *
 * Every class is written out in full on purpose: Tailwind scans the source
 * for literal class names, so anything assembled from fragments at runtime
 * would never get a stylesheet.
 *
 * Each span has a few variants, picked by position, so equal-sized works
 * sit at different places across the twelve columns and the index reads
 * as a hang rather than a table.
 */
const VARIANTS: Record<Span, string[]> = {
  full: ["sm:col-span-12"],
  wide: [
    "sm:col-span-8",
    "sm:col-span-8 sm:col-start-5",
    "sm:col-span-9 sm:col-start-4",
  ],
  half: [
    "sm:col-span-6",
    "sm:col-span-5 sm:col-start-8",
    "sm:col-span-6 sm:col-start-7",
    "sm:col-span-5 sm:col-start-2",
  ],
  narrow: [
    "sm:col-span-4 sm:col-start-2",
    "sm:col-span-4 sm:col-start-6",
    "sm:col-span-3 sm:col-start-9",
    "sm:col-span-4 sm:col-start-8",
  ],
};

/** Roughly how wide this work renders, so the browser fetches the right file. */
const SIZES: Record<Span, string> = {
  full: "(max-width: 640px) 100vw, 100vw",
  wide: "(max-width: 640px) 100vw, 66vw",
  half: "(max-width: 640px) 100vw, 50vw",
  narrow: "(max-width: 640px) 100vw, 33vw",
};

export function gridClass(span: Span, index: number) {
  const v = VARIANTS[span];
  return `col-span-12 ${v[index % v.length]}`;
}

export const sizesFor = (span: Span) => SIZES[span];
