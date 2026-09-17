"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const NAV = [
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Give the bar a paper backdrop only once the page has moved, so it
  // sits invisibly over the hero to begin with.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever navigation happens.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Hold the page still behind the open menu, and let Escape close it.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      /* The bar keeps its own paper ground rather than floating over a
         painting — small tracked type is unreadable on a bright canvas. */
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-colors duration-500 ${
        scrolled && !menuOpen ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <div
        className="flex items-baseline justify-between py-5"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Link href="/" className="label link-quiet shrink-0">
          {site.name}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-baseline gap-8 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className="label link-quiet"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="label sm:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="h-[100dvh] bg-paper sm:hidden"
      >
        <nav
          className="flex flex-col gap-6 pt-[12vh]"
          style={{ paddingInline: "var(--gutter)" }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className="display text-[clamp(2.5rem,13vw,4rem)] aria-[current=page]:text-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
