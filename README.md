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

Everything a visitor reads is in two files. No CMS, no database.

| File | What's in it |
| --- | --- |
| `content/site.ts` | Name, biography, artist statement, exhibitions, contact details, and the large uncaptioned paintings used on the home/about/contact pages |
| `content/works.ts` | The catalogue — one entry per painting, in hanging order |

### Adding paintings

1. Name the image files after the paintings, e.g. `Winter's Quiet River.jpg`
2. Run:

   ```bash
   node scripts/add-works.mjs ~/Desktop/new-paintings
   ```

   It resizes each photograph into `public/works/` and prints a block of
   catalogue entries with the real dimensions and colours filled in.
3. Paste that block into the `works` array in `content/works.ts`.
4. Fill in `year` and `dimensions`. Leave them empty and they are simply
   left off the wall label.

### How the index is laid out

Two paintings to a row, every work in the catalogue hung at the same
height and taking its width from its own shape — so a wide canvas is
wider than a tall one and the whole index sits on a single line, the way
work is hung on a wall. Tops, bottoms and wall labels line up, and
nothing is cropped.

To hang the work larger or smaller, change one number — `--row-h` in
`app/globals.css`. `--plate-h` beside it does the same for a painting on
its own page.

`featured: true` puts a work on the home page — six show there, so keep
six to eight flagged.

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
- Each painting's own page has a loupe: moving a cursor across the canvas
  opens a circular window onto the full-resolution file, for reading the
  brushwork. It caps itself at the photograph's native pixels rather than
  enlarging softness, so how much it can show depends entirely on the
  resolution of the photograph — another reason to swap in the high-res
  scans. It is off on touch screens, which have no hover.

## Still to do

- `year` and `dimensions` are blank for every work — the old site never
  recorded them.
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
