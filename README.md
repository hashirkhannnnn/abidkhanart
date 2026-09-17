# Abid Khan — artist site

A minimal gallery site for the painter Abid Khan. Next.js, statically
rendered, deployed on Vercel, pointed at `abidkhanart.com`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where the content lives

Paintings are managed in **WordPress**. Everything else — the biography,
the artist statement, the exhibition list, contact details — is in
`content/site.ts`, because it changes once a year rather than once a week.

| Source | What it holds |
| --- | --- |
| WordPress, `art` post type | The paintings: title, photograph, order, and the optional fields below |
| `content/site.ts` | Name, biography, artist statement, exhibitions, contact details, the uncaptioned plates |
| `content/works.ts` | The offline fallback — see below. Not edited by hand |

### How the WordPress connection works

`lib/wordpress.ts` reads the `art` post type through the WordPress REST
API. Pages are rebuilt at most every five minutes, so a painting added in
WordPress appears within that without anyone deploying anything.

Point it somewhere else with `WORDPRESS_URL` (see `.env.example`).
**WordPress currently sits on the main domain**, so before the new site
can take `abidkhanart.com`, WordPress needs to move to its own subdomain
— `cms.abidkhanart.com` is the usual choice — and `WORDPRESS_URL` set to
that.

### Adding a painting

In WordPress: add an `art` post, give it a title, set a featured image,
and order it with the post's menu order. That is the minimum — the title
and the photograph are all the site needs.

These optional custom fields are used if they exist, and quietly skipped
if they do not:

| Field | Effect |
| --- | --- |
| `year` | Shown on the wall label |
| `dimensions` | Shown on the wall label, e.g. `90 × 60 cm` |
| `medium` | Defaults to "Oil on canvas" |
| `featured` | Puts the work on the home page — six show there |
| `tone` | The colour held behind the photograph while it loads. Sampled from the painting if left empty |

The post body, if you write one, becomes the paragraphs on the painting's
own page.

### The offline fallback

If WordPress cannot be reached, the site serves the snapshot in
`content/works.ts` with photographs cached in `public/works/`, so a CMS
outage can never take the gallery down — it only means the catalogue is
as of the last deploy. This is tested: a build with WordPress unreachable
still produces every page.

Refresh the snapshot after changes in WordPress:

```bash
npm run sync
```

It pulls the catalogue, caches each photograph locally, samples the
colours, and rewrites `content/works.ts` and `content/tones.json`. Commit
what it changes.

## Design notes

- Two typefaces: Cormorant Garamond for anything large, Inter for the
  small tracked labels. Nothing else.
- Colours are warm — bone paper, near-black ink, never `#fff` or `#000`.
  They are defined once as tokens in `app/globals.css`; dark mode
  re-points the same tokens, which is why there is barely a `dark:`
  variant in the codebase.
- Each painting's dominant colour is stored as `tone` and held behind the
  photograph while it loads, so pages never flash white.
- Motion is slow and stops entirely under `prefers-reduced-motion`.
- The opening plate on the home page holds for seven seconds before
  slowly giving way to the next painting and round again. There are no
  dots or arrows — it is meant to read as a change of light. Reduce
  `plates.hero` in `content/site.ts` to one entry and it holds still;
  reduced-motion does the same automatically.
- Clicking a painting on its own page opens it full screen on a dark
  ground, where arrow keys page through the whole catalogue and Escape
  closes it.
- Each painting's own page has a loupe: moving a cursor across the canvas
  opens a circular window onto the full-resolution file, for reading the
  brushwork. It caps itself at the photograph's native pixels rather than
  enlarging softness, so how much it can show depends entirely on the
  resolution of the photograph — another reason to swap in the high-res
  scans. It is off on touch screens, which have no hover.

## Still to do

- `year` and `dimensions` are empty for every work — the old site never
  recorded them. They are now WordPress fields, so they can be filled in
  there without touching the code.
- No email address anywhere: the old site listed only phone numbers. Add
  one to `site.contact.email` and it appears on the contact page.
- `site.social` is empty because the old site's social icons linked
  nowhere. Add real profiles and they appear in the footer.
- Three photographs are too small to enlarge well
  (`a-landscape-holding-breath`, `nature-uninterrupted`,
  `village-beneath-the-clouds`). They are placed in small slots for now;
  better photographs would let them be hung properly.
- `public/paintings/` holds 29 high-resolution photographs from the
  studio PDF. Four match works already in the catalogue; the rest are
  paintings that were never on the old site and are waiting on titles.

## Deploying

The site is a standard Next.js app — `vercel` or a GitHub import both
work, with no configuration. Pointing `abidkhanart.com` at it is a DNS
change at the registrar; the WordPress site stays untouched until that
record moves.
