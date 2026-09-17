import type { Metadata } from "next";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { plates, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Enquiries, commissions and exhibition details — ${site.name}, ${site.location}.`,
};

export default function ContactPage() {
  return (
    <section className="px-[var(--gutter)] pt-[28vh] sm:pt-[32vh]">
      <Reveal>
        <h1 className="display text-[clamp(2.75rem,9vw,7rem)]">Get in touch</h1>
      </Reveal>

      <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-16 sm:mt-28">
        <Reveal className="col-span-12 sm:col-span-6">
          <p className="display max-w-[24ch] text-[clamp(1.35rem,2.6vw,2.05rem)] leading-[1.34]">
            {site.contact.note}
          </p>

          <dl className="mt-14 space-y-8">
            <div>
              <dt className="label text-muted">Studio</dt>
              <dd className="mt-2 text-[1.0625rem]">{site.contact.city}</dd>
            </div>

            {site.contact.phones.length > 0 && (
              <div>
                <dt className="label text-muted">Telephone</dt>
                <dd className="mt-2 flex flex-col gap-1">
                  {site.contact.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/[^\d+]/g, "")}`}
                      className="link-quiet w-fit text-[1.0625rem]"
                    >
                      {p}
                    </a>
                  ))}
                </dd>
              </div>
            )}

            {site.contact.email && (
              <div>
                <dt className="label text-muted">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-quiet w-fit text-[1.0625rem]"
                  >
                    {site.contact.email}
                  </a>
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-16 border-t border-rule pt-8">
            <h2 className="label text-muted">Commissions</h2>
            {site.commission.map((p) => (
              <p key={p} className="mt-4 max-w-[46ch] text-muted">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="col-span-12 sm:col-span-5 sm:col-start-8">
          <Plate
            src={plates.contact.src}
            alt={`Painting by ${site.name}`}
            width={plates.contact.width}
            height={plates.contact.height}
            tone={plates.contact.tone}
            sizes="(max-width: 640px) 100vw, 42vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
