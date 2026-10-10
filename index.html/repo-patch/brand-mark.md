# Scroll-reactive brand mark — patch for nexogroupoftech/nexo-corp-website

Files to change: every page's nav markup (index, projects, experiments, about, founder, privacy, terms .html), `style.css`, `script.js`.
The X symbol is the existing favicon.svg geometry, unchanged. Only the "OPICX" text animates.

## 1. HTML — replace the `<a class="brand brand-lock" …>…</a>` in each page

```html
<a class="brand brand-lock" href="index.html" data-brand aria-label="XOPICX home">
  <svg class="brand-x" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="square">
      <path d="M3.8 4.2 L11.7 12.1"/><path d="M20.3 19.9 L28.2 27.8"/>
      <path d="M28.2 4.2 L20.3 12.1"/><path d="M11.7 19.9 L3.8 27.8"/>
      <rect x="10.32" y="10.32" width="11.36" height="11.36"/>
    </g>
  </svg>
  <span class="brand-word" aria-hidden="true"><span>OPICX</span></span>
</a>
```

## 2. style.css — delete the old block from `.brand-lock {` through `.brand-lock.is-compact .glyph-x-end { width: 0; }`, and the `.brand-lock …` rules inside `@media (max-width: 760px)`. Add:

```css
.brand-lock { display: inline-flex; align-items: center; min-height: 44px; flex: none; color: var(--ink); letter-spacing: 0; }
.brand-lock:hover { color: var(--ink); }
.brand-x { width: 1.15rem; height: 1.15rem; max-width: none; flex: none; display: block; }
.brand-word {
  display: block; overflow: hidden; white-space: nowrap;
  max-width: 6rem; opacity: 1; transform: none;
  font-weight: 600; font-size: 0.98rem; line-height: 1.15rem; letter-spacing: 0.04em;
  transition: max-width 300ms cubic-bezier(.2,0,0,1), opacity 240ms ease, transform 300ms cubic-bezier(.2,0,0,1);
}
.brand-word > span { display: inline-block; padding-left: 0.3rem; }
.brand-lock.is-compact .brand-word { max-width: 0; opacity: 0; transform: translateX(-6px); }
```

In the existing `@media (prefers-reduced-motion: reduce)` block, replace the `.brand-lock …` selectors with `.brand-word`.

## 3. script.js — replace the `brand` / `syncBrand` section (top of the DOMContentLoaded handler, through the `if (brand) { … }` listener block) with:

```js
const brand = document.querySelector("[data-brand]");
if (brand) {
  let lastY = window.scrollY, ticking = false, compact = false;
  const set = (v) => { if (v !== compact) { compact = v; brand.classList.toggle("is-compact", v); } };
  const update = () => {
    ticking = false;
    const y = Math.max(0, window.scrollY), dy = y - lastY;
    if (y <= 24) set(false);
    else if (dy > 8 && y > 80) set(true);
    else if (dy < -8) set(false);
    if (Math.abs(dy) > 8 || y <= 24) lastY = y;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pagehide", () => window.removeEventListener("scroll", onScroll));
  update();
}
```

Also delete `syncBrand();` from the `resize` handler further down. With the nav menu open, `body.nav-open` blocks scrolling, so the mark stays as it is.
