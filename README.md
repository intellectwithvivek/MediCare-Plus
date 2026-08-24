<div align="center">

# MediCare Plus — free Next.js hospital website template

A complete, production-quality clinic website with a four-step online appointment
booking flow. Built with **Next.js 16**, **React 19** and
**[VivekUI](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=hospital&utm_medium=readme)** —
no Tailwind, no shadcn, no UI dependency at all.

[![npm version](https://img.shields.io/npm/v/@the_viveksingh/vivek-ui?color=0b62d6&label=%40the_viveksingh%2Fvivek-ui)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![npm downloads](https://img.shields.io/npm/dm/@the_viveksingh/vivek-ui?color=0b62d6)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-000?logo=nextdotjs)](https://nextjs.org)
[![Stars](https://img.shields.io/github/stars/intellectwithvivek/MediCare-Plus?style=social)](https://github.com/intellectwithvivek/MediCare-Plus)

**[▶ Live demo](https://medicare.vivekkumarsingh.in)** ·
**[Docs](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=hospital&utm_medium=readme)** ·
**[Component map](https://medicare.vivekkumarsingh.in/built-with)**

<!-- TODO after first deploy: replace with a real screenshot of the homepage. -->
<!-- ![MediCare Plus homepage](./docs/screenshot.png) -->

</div>

---

> **This is a demo template, not a real medical provider.** Every doctor, phone
> number, address, price and statistic is fictional, no appointment is really
> booked, and nothing here is medical advice.

## What you get

| | |
|---|---|
| **Booking flow** | Four steps — department & doctor → date & slot → patient details → OTP → confirmation with booking ID and a "what happens next" timeline. |
| **Routes** | `/` · `/doctors` · `/doctors/[slug]` · `/departments` · `/book` · `/built-with` |
| **Charts** | Appointments per month (BarChart), share by department (PieChart), satisfaction and on-time rates (two ProgressRings). |
| **SEO** | Metadata API per route, `sitemap.ts`, `robots.ts`, canonicals, OG + Twitter, one `h1` per page. |
| **Structured data** | `Hospital` + `MedicalClinic`, `Physician` per profile, `BreadcrumbList` everywhere, `FAQPage`, plus `SoftwareSourceCode` + `Person` describing the template itself. |
| **AEO** | `public/llms.txt` and a real FAQ with direct, quotable answers. |
| **Brand assets** | Generated favicon set (`.ico` at 16/32/48, SVG, 180px Apple touch icon), maskable PWA icons, web app manifest, and a generated 1200×630 OG/Twitter card. |
| **Accessibility** | WCAG AA contrast, visible focus, skip link, keyboard-navigable scheduler, `prefers-reduced-motion` respected. |
| **Theming** | Blue accent, light by default, full dark mode, no flash on load. |

Everything is a server component except five small islands: the navbar, the
booking flow, the footer clock, the map and the copy buttons.

### A note on the structured data

There is deliberately **no `aggregateRating`** on the `Hospital` or `Physician`
nodes. The star ratings you see are demo content, and emitting a
machine-readable `reviewCount` for a clinic that does not exist is a fabricated
review claim — the thing Google's structured-data spam policy is aimed at. Put
your real numbers in `components/json-ld.tsx` once you have real ones.

## Quick start

```bash
git clone https://github.com/intellectwithvivek/MediCare-Plus.git
cd MediCare-Plus
npm install
npm run dev
```

Open <http://localhost:3000>. Requires **Node.js 20.9+** (22 LTS recommended).

```bash
npm run build   # production build
npm start       # serve the build
npm run lint    # eslint
```

### Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fintellectwithvivek%2FMediCare-Plus&project-name=medicare-plus&repository-name=medicare-plus)

## Making it yours

Everything you would change lives in two folders.

```
lib/site.ts             name, URLs, phone numbers, address, opening hours
data/departments.ts     the eight specialties, conditions, heads of department
data/doctors.ts         consultants, qualifications, weekly clinic timetables
data/slots.ts           the 30-minute slot grid and the mock availability
data/content.ts         testimonials, FAQ answers, statistics, next steps
data/charts.ts          the twelve months and the department split
app/globals.css         the blue accent and the hero cross/pulse motif
```

There is no backend and no auth. Form submissions raise a `Toast`; wire them to
your own API route or server action when you have one.

**Changing the accent colour** is four custom properties in `app/globals.css`.
Every VivekUI rule sits inside `:where()`, so a plain `:root` or class override
wins without `!important`:

```css
:root {
  --vk-color-primary: #0b62d6;
  --vk-color-primary-hover: #0a58c0;
  --vk-color-primary-subtle: #e8f1fd;
  --vk-color-ring: #0b62d6;
}
```

## Powered by VivekUI

```bash
npm i @the_viveksingh/vivek-ui
```

```tsx
// app/layout.tsx
import '@the_viveksingh/vivek-ui/styles.css';
import '@the_viveksingh/vivek-ui/charts.css';
```

That is the whole setup. **91 React components and 6 SVG charts, zero runtime
dependencies** — one install, one CSS import, no config, no Tailwind, no
PostCSS plugin. `Scheduler`, `Stepper`, `OTPInput`, `DatePicker` and all three
charts on this site come from that same package, at no extra install and behind
no paid tier.

See **[/built-with](https://medicare.vivekkumarsingh.in/built-with)** for every
section of this site mapped to the component that renders it.

- **Docs** — <https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=hospital&utm_medium=readme>
- **npm** — <https://www.npmjs.com/package/@the_viveksingh/vivek-ui>
- **GitHub** — <https://github.com/intellectwithvivek/vivek_UI>
- **Author** — [Vivek Kumar Singh](https://vivekkumarsingh.in/?utm_source=vivekui-template&utm_campaign=hospital&utm_medium=readme)

## Brand assets

The icon set is generated from a single description rather than hand-exported,
so every size is a properly filtered version of the same artwork:

```
app/icon.svg                  vector favicon (modern browsers)
app/favicon.ico               16 / 32 / 48 raster fallback
app/apple-icon.png            180px, full-bleed and opaque for iOS
public/icon-192.png           PWA icon, purpose "any"
public/icon-512.png           PWA icon, purpose "any"
public/icon-maskable-512.png  PWA icon, purpose "maskable" (Android safe zone)
app/opengraph-image.tsx       1200x630 social card, generated with next/og
components/logo.tsx           the same mark, inline, for the header and footer
```

To rebrand: change the two hex stops in `components/logo.tsx` and
`app/icon.svg`, then regenerate the PNGs with any icon tool at the sizes above.

## Images

Portraits and interiors come from [Unsplash](https://unsplash.com), avatars from
[i.pravatar.cc](https://i.pravatar.cc). Hosts are allow-listed in
`next.config.ts` under `images.remotePatterns` — add your own CDN there before
swapping the photos.

## Licence

MIT — see [LICENSE](./LICENSE). Use it commercially, rebrand it, ship it.

The "Built with VivekUI" credit in the footer and navbar is **removable**; it is
not a licence condition. If the template saved you a day, a ⭐ on
[the VivekUI repo](https://github.com/intellectwithvivek/vivek_UI) is
appreciated.
