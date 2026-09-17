import type { Work } from "@/content/works";

/**
 * The caption under a work, set the way a gallery sets a wall label.
 * Year and dimensions are simply left out until they are recorded.
 */
export default function WallLabel({
  work,
  full = false,
}: {
  work: Work;
  /** Include medium and dimensions. Off in the denser grids. */
  full?: boolean;
}) {
  const details = [work.medium, work.dimensions].filter(Boolean);

  return (
    <figcaption className="mt-4 text-[0.8125rem] leading-relaxed">
      <span className="font-display text-[1.0625rem] italic tracking-tight">
        {work.title}
      </span>
      {work.year && <span className="text-muted">, {work.year}</span>}
      {full && details.length > 0 && (
        <span className="mt-1 block text-muted">
          {details.map((d, i) => (
            <span key={d}>
              {i > 0 && <span className="mx-1.5 opacity-50">·</span>}
              {d}
            </span>
          ))}
        </span>
      )}
    </figcaption>
  );
}
