import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer
      className="border-t border-rule pt-10 pb-12"
      style={{ paddingInline: "var(--gutter)", marginTop: "var(--section)" }}
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="label">{site.name}</p>
          <p className="label mt-2 text-muted">{site.location}</p>
        </div>

        <nav className="flex flex-col gap-2 sm:items-end">
          <Link href="/works" className="label link-quiet">
            Works
          </Link>
          <Link href="/about" className="label link-quiet">
            About
          </Link>
          <Link href="/contact" className="label link-quiet">
            Contact
          </Link>
        </nav>

        <div className="flex flex-col gap-2 sm:items-end">
          {site.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              className="label link-quiet text-muted"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <p className="label mt-14 text-muted">
        © {new Date().getFullYear()} {site.name}. All works and images
        reproduced by permission of the artist.
      </p>
    </footer>
  );
}
