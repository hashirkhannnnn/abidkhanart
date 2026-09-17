"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A magnifying glass over a painting.
 *
 * Moving the cursor across the canvas opens a circular window onto the
 * full-resolution photograph, so the brushwork can be read close up — the
 * nearest thing a screen has to leaning in towards a canvas.
 *
 * The lens is driven by writing to the element's style directly rather than
 * through React state: a pointer moving across a painting fires far too many
 * events to re-render on, and this keeps it smooth.
 *
 * It only appears for a real pointer — a touch screen has no hover, so there
 * the painting is simply left alone.
 */
export default function Loupe({
  /** The full-size file to magnify — the original, not a resized variant. */
  src,
  /** The file's real pixel width, so the lens never invents detail. */
  naturalWidth,
  children,
  /** How much closer the lens brings the surface, resolution permitting. */
  zoom = 2.6,
  /** Lens diameter in pixels. */
  size = 240,
}: {
  src: string;
  naturalWidth: number;
  children: ReactNode;
  zoom?: number;
  size?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  // `enabled` gates the whole feature on having a hovering, fine pointer.
  const [enabled, setEnabled] = useState(false);
  // The lens stays hidden until the full-size file is decoded, so it never
  // opens onto an empty circle.
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  /** Fetch the full-size photograph once, the first time it's wanted. */
  const preload = useCallback(() => {
    if (ready) return;
    const img = new Image();
    img.onload = () => setReady(true);
    img.src = src;
  }, [ready, src]);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const host = hostRef.current;
      const lens = lensRef.current;
      if (!host || !lens) return;

      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        // Expressing the focal point as a percentage lets the browser handle
        // the edges: at 0% the lens sits flush with the left of the image,
        // at 100% flush with the right, with no arithmetic for the corners.
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        lens.style.width = `${size}px`;
        lens.style.height = `${size}px`;
        // Magnifying past the photograph's own resolution only enlarges
        // the softness, so the lens stops at native pixels. A low-resolution
        // photograph simply gets a gentler lens.
        const native = naturalWidth / rect.width;
        const z = Math.max(1.6, Math.min(zoom, native));
        lens.style.backgroundSize = `${rect.width * z}px ${rect.height * z}px`;
        lens.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
        lens.style.backgroundPosition = `${px}% ${py}%`;
      });
    },
    [enabled, size, zoom, naturalWidth],
  );

  return (
    <div
      ref={hostRef}
      className="loupe-host relative"
      data-active={enabled && ready && active}
      onPointerEnter={(e) => {
        if (!enabled) return;
        preload();
        setActive(true);
        onMove(e);
      }}
      onPointerMove={onMove}
      onPointerLeave={() => setActive(false)}
    >
      {children}

      {enabled && (
        <div
          ref={lensRef}
          aria-hidden="true"
          className="loupe"
          style={{
            width: size,
            height: size,
            backgroundImage: `url(${src})`,
          }}
        />
      )}
    </div>
  );
}
