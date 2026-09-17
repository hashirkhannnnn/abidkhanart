import Link from "next/link";
import Plate from "./Plate";
import WallLabel from "./WallLabel";
import type { Work } from "@/content/works";

/** A work in a grid: the photograph, its wall label, linked to its page. */
export default function WorkLink({
  work,
  sizes,
  priority = false,
  full = false,
  className = "",
}: {
  work: Work;
  sizes: string;
  priority?: boolean;
  full?: boolean;
  className?: string;
}) {
  return (
    <Link href={`/works/${work.slug}`} className={`group block ${className}`}>
      <figure>
        <Plate
          src={work.image}
          alt={`${work.title} — ${work.medium} by Abid Khan`}
          width={work.width}
          height={work.height}
          tone={work.tone}
          sizes={sizes}
          priority={priority}
        />
        <WallLabel work={work} full={full} />
      </figure>
    </Link>
  );
}
