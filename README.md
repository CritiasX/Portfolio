# James Roi Tanglao — portfolio

A frontend-only portfolio built with React, Vite, Three.js, and Lenis. No PHP runtime, API, database, or backend is required to host it. Laravel and Django appear as technologies used in the projects.

## Development

Use Node.js 22.12+ (or Node.js 24) and pnpm.

```sh
pnpm install
pnpm dev
```

## Production

```sh
pnpm build
pnpm preview
```

Publish `dist/` on a static host. If deploying under a subdirectory such as GitHub Pages, set the appropriate `base` in `vite.config.js` before building.

## Content

`src/profile.js` holds the name, role, contacts, three photo slides, certifications, and projects. The Databricks Associate Data Engineer certification appears below the toolkit. Add a credential URL or award date when those details are available.

### Games carousel

`src/GameCarousel.jsx` features Valorant, Dota 2, Resident Evil, and God of War one at a time with lightweight SVG artwork. Use previous/next, a game selector, or left/right arrow keys; Home/End jump to the first/last game. Slides advance manually and respect the site's animation control.

### Photo carousel

Photo originals live in `public/photos/`. Run `pnpm images:optimize` after replacing the current originals to regenerate 480px, 960px, and 1440px WebP versions plus `src/photoAssets.js`. New photos can be added to the source map in `scripts/optimize-photos.mjs` and referenced from `src/profile.js`. Sharp runs only during asset preparation; the site remains a static frontend.

The browser selects a size for the current screen through `srcSet` and `sizes`. The three 960px versions total about 253 KiB, down from 1,030 KiB for the JPG originals (75% smaller). Actual transfer depends on screen size and cache. Original files are retained.

`src/LazyImage.jsx` attaches image sources only within 200px of the viewport, with native lazy loading and asynchronous decoding as well. Only the selected carousel photo mounts; other slides do not download ahead of selection. Explicit dimensions reserve space. Project screenshots use the same lazy component. Empty/broken paths show designed placeholders. Visitors can use previous/next, slide buttons, and keyboard arrows; slides do not auto-advance.

The supplied photos appear as graduation portrait, restaurant photo, then the playful snapshot. Each slide has a `position` for responsive framing; the decorative placeholder stamp is hidden on real photos.

### Project cards

BulSU InternConnect, this portfolio, and Survey Builder have illustrated covers and accessible detail dialogs. Update descriptions and details as case studies become ready. Set `image` to a screenshot in `public/projects/` and `url` to an HTTPS demo URL (or `#home` for this portfolio). Screenshots, performance results, and external project links have not been invented.

## Styling and motion

- `src/App.jsx`: sections, responsive navigation, filters, carousel, native dialogs, a header scrolling toggle, and a footer animation toggle.
- `src/App.css` / `src/index.css`: ivory and blue-black palette, system typography, sticky header, hover effects, and scroll reveals.
- `react-icons`: named SVG imports for Lucide controls and technology/social brand marks. `src/TechnologyIcon.jsx` maps the toolkit logos; Matplotlib uses a local SVG adaptation of its official polar logo. Icons inherit the active palette and require no icon font or external asset requests.
- `src/ThemeToggle.jsx` / `src/theme.css`: header night-mode toggle with a cool dark palette across sections, cards, carousel artwork, and dialogs. The original day palette is the default; a choice is saved as `jrt-theme` and applied before the app paints on reload. Switching palettes works even when browser storage is blocked.
- `src/usePortfolioMotion.js`: Lenis smooth wheel and anchor scrolling, active navigation tracking, and history navigation. Smooth scrolling and decorative animations default to enabled, including in Brave with OS reduced motion. Independent header/footer controls allow explicit opt-outs. Reveals replay when content re-enters the viewport, with focused content always visible. Changing scrolling mode does not restart a manually paused sculpture. Touch scrolling stays native; dialog scrolling is separate. Blocked browser storage is supported.
- `src/motionPreferences.js`: the shared default for controls and hero autoplay. The old OS-derived `jrt-motion` setting is replaced by `jrt-animations-v2`; future explicit reduced/full choices are saved under the new key.
- `src/Sculpture.jsx`: interactive data sculpture that starts playing by default, with a local play/pause control.
- `src/FragranceGallery.jsx` / `.css`: reference-based bottle studies for Hawas Ice, CDN Iconic, Odyssey Mega, and CDNIM. Hover (or focus a name) to select; click to spin/pause; drag or use arrows to turn. Procedural geometry and textures approximate the supplied references, rather than scanned replicas.
- `src/fragranceMaterials.js`: curved flask, liquid/meniscus, and print geometry, plus GLSL extensions to Three.js physical materials. Hawas has one continuous light-blue, alpha-blended liquid volume extending to the rounded bottom; its outer glass retains the physical highlights. Procedural surface detail is limited to the leather and cap shaders. Studio reflections and baked contact shadows provide depth without live shadow-map passes. Shader failures fall back to the accessible CSS shelf.
- `index.html` / `public/favicon.svg`: page metadata and monogram.

Both 3D scenes share `src/renderScheduler.js`: renders are coalesced and capped at 30 fps, with no scene RAF callbacks while idle, offscreen, or in a hidden tab. Desktop pixel density is capped at 1.25 and mobile at 1. The gallery uses four stable bottle hit volumes, instanced decorative details, smaller textures, a 128px studio environment, and asynchronous shader initialization. Compared with the previous model construction, gallery draw calls fell from 79 to 39, triangles from 38,432 to 17,712, and base texture allocation from 28 to 7 MiB. These are asset/render-budget counts, not device-specific FPS measurements.

Scenes load near the viewport and dispose resources on unmount. Disabling decorative animations pauses active spins without disabling smooth navigation; button/text color, outline, and focus feedback remain visible. CSS fallbacks work without WebGL. There are no external model or font downloads.

Run `pnpm test:scroll` to check the real rendered controls across fresh/reduced-motion profiles, independent saved choices, and blocked browser storage. This is a component-level regression check; it does not replace testing actual wheel input in the target browser.

Run `pnpm test:render` to check frame coalescing, the 30 fps limit, idle/offscreen/tab suspension, resume timing, and scheduler disposal.

The previous Laravel portfolio was not in this workspace; this is a new static frontend.
