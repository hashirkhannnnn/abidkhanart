import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col justify-center px-[var(--gutter)] pt-[24vh]">
      <h1 className="display text-[clamp(2.5rem,8vw,6rem)]">
        Nothing hangs here
      </h1>
      <p className="mt-6 max-w-[38ch] text-muted">
        The page you asked for does not exist, or the work has been moved.
      </p>
      <div className="mt-10 flex gap-8">
        <Link href="/" className="label link-quiet">
          Home
        </Link>
        <Link href="/works" className="label link-quiet">
          Works
        </Link>
      </div>
    </section>
  );
}
