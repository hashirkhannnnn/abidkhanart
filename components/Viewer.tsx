"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";
import Loupe from "./Loupe";
import Plate from "./Plate";
import type { Work } from "@/content/works";

/**
 * The painting on its own page: hover to read the surface close up, click
 * to see it full screen. Two ways in, and nothing on the page to clutter it.
 */
export default function Viewer({
  work,
  works,
}: {
  work: Work;
  /** The catalogue, so the full-screen view can page through it. */
  works: Work[];
}) {
  const [open, setOpen] = useState(false);
  const index = Math.max(
    0,
    works.findIndex((w) => w.slug === work.slug),
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View ${work.title} full screen`}
        className="block w-full cursor-zoom-in text-left"
      >
        <Loupe src={work.image} naturalWidth={work.width}>
          <Plate
            src={work.image}
            alt={`${work.title} — ${work.medium} by Abid Khan`}
            width={work.width}
            height={work.height}
            tone={work.tone}
            sizes="(max-width: 640px) 100vw, 80vw"
            priority
          />
        </Loupe>
      </button>

      {open && (
        <Lightbox works={works} index={index} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
