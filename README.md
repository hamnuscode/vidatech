# VidaTech

Marketing site for **VidaTech** — the exclusive Pakistan partner of Spanish
manufacturer **GENAQ**, producing atmospheric water generators (AWGs) that
extract clean drinking water from humidity in the air.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript, Turbopack |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Motion | `motion` (Framer Motion 12), GSAP for text splitting |
| 3D / WebGL | React Three Fiber + `@react-three/drei`, custom GLSL |
| UI sources | [React Bits](https://reactbits.dev) (vendored), [21st.dev Magic MCP](https://21st.dev/mcp) |

## Design system

Light mode only. The palette is fixed in `globals.css`:

| Token | Hex | Use |
|---|---|---|
| `--color-navy` | `#092140` | Text, headings, footer, dark buttons |
| `--color-teal` | `#0790a3` | Primary brand, links, highlights |
| `--color-gold` | `#f9b341` | Accents and key CTAs **only** |
| `--color-blue` | `#82aeba` | Section tints, borders, secondary UI |
| `--color-paper` | `#fcfcfc` | Base background, cards |

**Gold never appears in water.** Every water surface, fill, divider, and
progress line runs teal → blue. Gold is reserved for actions and accents so it
reads as "do this" rather than as part of the product. The one exception is
`--grad-water-text`, the headline sweep, where gold is taken down to a bronze
that clears 3:1 contrast at display sizes.

Type: **Sora** (display), **Inter** (body), **IBM Plex Mono** (spec figures,
eyebrows, data labels).

### The signature: one water level, five scales

`src/components/water/WaterFill.tsx` is the device the whole site is built
around. Every quantity is drawn as a level in a vessel with a real travelling
wave surface — loader progress, product capacity, stat magnitude, humidity
yield, process step, form submission. Readers learn to read it once on the
loader and then recognise it everywhere.

## Structure

```
src/
  app/
    page.tsx              Home — hero, problem, process, value props,
                          range overview, applications, partner, CTA
    technology/           Five-step process in detail, humidity/output,
                          water-quality standards
    products/             All 8 products, filterable by range/output/use case
    about/                Story, mission/vision/values, timeline, GENAQ
    blog/                 Listing + [slug] article template
    contact/              Glass form, details, map, WhatsApp
  components/
    brand/                Logo (matted from supplied artwork)
    chrome/               Loader, Navbar, Footer
    sections/             Page sections
    ui/                   Button, Reveal, Eyebrow, SectionHeading, GlassPanel
    water/                WaterFill, WaveDivider, HeroWater (R3F), HeroCanvas
    reactbits/            Vendored React Bits components
  lib/
    products.ts           Catalogue (8 products, 4 ranges)
    blog.ts               Posts
    site.ts               Nav, contact details, process, applications
```

## The hero

`HeroCanvas` gates the WebGL scene: it mounts only when the browser is idle,
the device has more than three cores, the OS is not in data-saver mode, and
`prefers-reduced-motion` is not set. Everything else gets `StillWater`, a
CSS/SVG version of the same surface.

The scene itself (`HeroWater.tsx`) is a shader water plane plus falling drops.
Drops land on the surface and push a real ring into a shared ripple buffer; so
does every click. The cursor is projected onto the water plane mathematically
rather than by raycast, so the surface answers the pointer **anywhere in the
hero** — including where the headline sits on top of the canvas.

## Before launch

- [ ] **Verify all product specs.** Model names, capacities, footprints, and
      formats in `src/lib/products.ts` are realistic placeholders based on
      GENAQ's public ranges. Replace with VidaTech's catalogue.
- [ ] **Verify the humidity figures** in `src/components/sections/Problem.tsx`
      and the yield curve in `src/app/technology/page.tsx`, and cite a source.
- [ ] **Real contact details** in `src/lib/site.ts` (address, phone, WhatsApp,
      email are placeholders), and point the map at the real address.
- [ ] **Wire the contact form.** `ContactForm.onSubmit` currently fakes the
      request; swap the `setTimeout` for the real endpoint.
- [ ] **Wire the newsletter** in `Footer.tsx`, same situation.
- [ ] **Social links** in `Footer.tsx` point at bare domains.
- [ ] Replace the logo files in `/public` if higher-resolution artwork exists —
      the current PNGs were matted off the supplied screenshot. `Logo.tsx`
      reads `vidatech-lockup.png` and `vidatech-lockup-onnavy.png`; nothing
      else needs to change.

## Accessibility

Skip link, visible brand-coloured focus rings on everything focusable, labelled
form fields with `aria-invalid` and described errors, `aria-pressed` filter
chips, `aria-current` navigation, and a full `prefers-reduced-motion` path that
swaps the WebGL hero for a still surface and stops all drift. Verified no
horizontal overflow down to 430px.
