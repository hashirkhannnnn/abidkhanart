"use client";

import { useEffect, useState } from "react";
import Plate from "./Plate";

type Painting = { src: string; width: number; height: number; tone: string };

/**
 * The opening plate, holding on one painting for a long while before giving
 * way to the next. Slow enough to register as a change of light rather than
 * a slideshow — there are no dots, no arrows and nothing to operate.
 *
 * With one painting, or when the visitor has asked for reduced motion, it
 * simply shows the first and stays there.
 */
export default function HeroPlates({
  paintings,
  /** Seconds each painting holds before the next begins to surface. */
  hold = 7,
}: {
  paintings: readonly Painting[];
  hold?: number;
}) {
  const [current, setCurrent] = useState(0);
  // Only the opening painting is fetched up front. The rest are mounted a
  // moment later so they aren't competing with it for the first paint.
  const [mountRest, setMountRest] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMountRest(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (paintings.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(
      () => setCurrent((n) => (n + 1) % paintings.length),
      hold * 1000,
    );
    return () => clearInterval(id);
  }, [paintings.length, hold]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {(mountRest ? paintings : paintings.slice(0, 1)).map((p, i) => (
        <div
          key={p.src}
          aria-hidden={i === current ? undefined : "true"}
          className="absolute inset-0 transition-opacity duration-[2200ms] ease-[var(--ease-gallery)] motion-reduce:transition-none"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Plate
            src={p.src}
            alt="Painting by Abid Khan"
            width={p.width}
            height={p.height}
            tone={p.tone}
            sizes="100vw"
            priority={i === 0}
            cover
          />
        </div>
      ))}
    </div>
  );
}
