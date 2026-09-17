"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A photograph of a painting. Holds the painting's own dominant colour
 * behind it while it loads, so nothing flashes white and nothing jumps.
 */
export default function Plate({
  src,
  alt,
  width,
  height,
  tone,
  sizes,
  priority = false,
  /** Fill the parent and crop, instead of keeping the painting's own shape. */
  cover = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  tone: string;
  /** How wide this renders, so the browser fetches the right file. */
  sizes: string;
  priority?: boolean;
  cover?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A cached image can already be decoded by the time React hydrates, in
  // which case onLoad never fires — without this the painting would stay
  // hidden behind its tone for good.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={`plate relative overflow-hidden ${cover ? "h-full w-full" : ""} ${className}`}
      data-loaded={loaded}
      style={{
        backgroundColor: tone,
        ...(cover ? null : { aspectRatio: `${width} / ${height}` }),
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
        /* Never leave a broken image invisible — show the alt text instead. */
        onError={() => setLoaded(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
