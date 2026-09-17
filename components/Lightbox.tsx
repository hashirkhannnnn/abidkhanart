"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Work } from "@/content/works";

/**
 * A full-screen view of a painting, on a dark ground so nothing competes
 * with it. Arrow keys and the two edge buttons page through the catalogue
 * without leaving the view; Escape or a click on the ground closes it.
 */
export default function Lightbox({
  works,
  index,
  onClose,
}: {
  works: Work[];
  index: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(index);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (step: number) => setI((n) => (n + step + works.length) % works.length),
    [works.length],
  );

  // Hold the page still behind the view, take focus into it, and give focus
  // back to whatever opened it on the way out.
  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      restoreTo.current?.focus?.();
    };
  }, [go, onClose]);

  const work = works[i];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title}, enlarged`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b0b0a]/97 backdrop-blur-sm"
    >
      <div className="flex items-baseline justify-between px-[var(--gutter)] py-5">
        <p className="label text-white/55">
          {String(i + 1).padStart(2, "0")} / {works.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="label text-white/75 transition-colors hover:text-white"
        >
          Close
        </button>
      </div>

      {/* The painting, filling the space between the two bars. It is laid
          out by the box rather than by its own intrinsic size — a max-height
          alone can only ever shrink an image, never grow it to the room
          available. Clicks here are kept from closing the view. */}
      <div
        className="relative min-h-0 flex-1 mx-[var(--gutter)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={work.slug}
          src={work.image}
          alt={`${work.title} — ${work.medium} by Abid Khan`}
          fill
          sizes="100vw"
          priority
          className="object-contain"
        />
      </div>

      <div
        className="flex items-baseline justify-between gap-6 px-[var(--gutter)] py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          className="label text-white/55 transition-colors hover:text-white"
        >
          ← Previous
        </button>

        <p className="text-center">
          <span className="font-display text-[1.2rem] text-white/90 italic">
            {work.title}
          </span>
          <span className="label mt-1 block text-white/45">{work.medium}</span>
        </p>

        <button
          type="button"
          onClick={() => go(1)}
          className="label text-white/55 transition-colors hover:text-white"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
