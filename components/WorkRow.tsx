import WorkLink from "./WorkLink";
import type { Work } from "@/content/works";

/**
 * A row of paintings hung at a common height.
 *
 * Every work in the catalogue is shown at the same height — `--row-h` — and
 * takes its width from its own shape, so a wide canvas is wider than a tall
 * one and the whole index sits on a single line, the way work is hung on a
 * wall. Nothing is cropped, and the wall labels start at the same baseline
 * because the paintings above them end at the same one.
 *
 * Rows are centred rather than justified: forcing each row to fill the page
 * would mean a row of two tall canvases appeared at a different scale from a
 * row of two wide ones, which is the thing a shared height is there to avoid.
 *
 * Below the small breakpoint the row stacks and each painting takes the full
 * width, so the sizing applies only from `sm` up.
 */
export default function WorkRow({
  works,
  priority = false,
}: {
  works: Work[];
  priority?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-y-14 sm:flex-row sm:items-start sm:justify-center sm:gap-x-10">
      {works.map((work) => (
        <div
          key={work.slug}
          style={{ "--ar": work.width / work.height } as React.CSSProperties}
          className="w-full min-w-0 shrink sm:w-[calc(var(--row-h)*var(--ar))]"
        >
          <WorkLink
            work={work}
            /* Roughly how wide this renders: the row height is a share of the
               viewport height, so express the width the same way. */
            sizes={`(max-width: 640px) 100vw, ${Math.round(
              42 * (work.width / work.height),
            )}vh`}
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
