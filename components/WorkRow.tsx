import WorkLink from "./WorkLink";
import type { Work } from "@/content/works";

/**
 * A row of paintings hung at a common height.
 *
 * Each painting is given a flex-grow equal to its own aspect ratio, so the
 * row divides itself in proportion to the shapes in it: a wide canvas takes
 * more of the row than a tall one, and because every width is then that
 * painting's own ratio times a single shared height, the tops and bottoms
 * line up exactly — without cropping anything. The wall labels start at the
 * same baseline for the same reason.
 *
 * The row is held to `--row-w` of the page and centred, which is what sets
 * the scale of the hang: the proportions inside the row are untouched, so
 * narrowing it shrinks every painting evenly and the alignment is unaffected.
 *
 * Below the small breakpoint the row stacks and each painting takes the full
 * width, so the flex sizing is applied only from `sm` up.
 */
export default function WorkRow({
  works,
  priority = false,
}: {
  works: Work[];
  priority?: boolean;
}) {
  const ratios = works.map((w) => w.width / w.height);
  const total = ratios.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-y-14 sm:mx-auto sm:w-[var(--row-w)] sm:flex-row sm:items-start sm:gap-x-8">
      {works.map((work, i) => (
        <div
          key={work.slug}
          style={{ "--grow": ratios[i] } as React.CSSProperties}
          className="min-w-0 sm:[flex-basis:0] sm:[flex-grow:var(--grow)]"
        >
          <WorkLink
            work={work}
            /* This work's share of a row that is itself ~84% of the page. */
            sizes={`(max-width: 640px) 100vw, ${Math.round(
              (ratios[i] / total) * 84,
            )}vw`}
            priority={priority}
            full
          />
        </div>
      ))}
    </div>
  );
}

/** Splits the catalogue into rows of `size`, keeping the hanging order. */
export function toRows<T>(items: T[], size = 2): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}
