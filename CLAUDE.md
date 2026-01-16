# CLAUDE.md

Project guidance for Claude Code when working on this codebase.

## Project Overview

Slow Content is a single-page website promoting thoughtful, quality web content. Originally exported from Webflow, it has been optimised with vanilla JS, self-hosted fonts, and consolidated CSS.

## Tech Stack

- Static HTML/CSS/JS site
- Self-hosted Bely fonts (woff/woff2)
- No build process - edit files directly
- Hosted on GitHub Pages

## Key Files

- `index.html` - Single page with all content
- `css/styles.css` - Combined stylesheet (normalize + base + components)
- `js/main.js` - Vanilla JS for animations, mobile nav, quote slider
- `images/favicon.svg` - SVG favicon with light/dark mode support

## CSS Architecture

The stylesheet is organised in sections:
1. Reset (normalize.css)
2. Base styles (typography, body, sections, navigation)
3. Components & overrides (animations, mobile nav, quote slider)
4. Responsive breakpoints (991px tablet, 767px mobile, 479px small mobile)

## Brand Guidelines

Full Contentious brand guidelines: https://style.contentious.ltd

Key sections:
- Colours: https://style.contentious.ltd/design/colours/
- Typography: https://style.contentious.ltd/design/typography/
- Voice & tone: https://style.contentious.ltd/words/

### Colours Used in This Project

From the Contentious palette:
- **Gloaming 900** `#1A1918` - Dark (near black)
- **Limestone 500** `#F2F2E7` - Light background (off-white)
- **Gloaming 700** `#383533` - Dark text
- **Wave 500** `#89A6AB` - Muted teal (hover states)
- **Sapling 500** `#81A479` - Muted green (gradients)
- **Sapling 700** `#678361` - Link green
- **Sunshine 500** `#E7AB3F` - Accent yellow
- `hsl(109 19% 56%/ 98%)` - Mobile menu overlay (Sapling-based)

### Typography

- **Bely** - Body text (serif, designed by Roxane Gataud)
- **Bely Display** - Page and section headings
- Base font size: 24px on desktop
- Line heights: 1.2em headings, 1.4em body

### Writing Style

- En dash (–) for ranges, not hyphen
- Curly quotes (" ") not straight quotes
- No Oxford comma
- Short paragraphs, one idea each

## Common Patterns

### Centred Container
```css
.element {
  width: 1080px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}
```

### Fade-in Animation (scroll-triggered)
```css
.fade-in {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Staggered Animation Delays
```css
.parent.open .child:nth-child(1) { transition-delay: 0.1s; }
.parent.open .child:nth-child(2) { transition-delay: 0.2s; }
/* etc */
```

## Lessons Learned

### Mobile Overflow Issues
- **Avoid `100vw`** - On mobile, `vw` includes scrollbar width and causes horizontal overflow
- Use `width: 100%` instead, which respects the parent container
- Add `overflow-x: hidden` to `html` and `body` as a safeguard

### Flexbox Sizing
- Use `flex: 1 1 50%` instead of fixed `width: 50vw` for responsive flex children
- Add `min-width: 0` to allow flex items to shrink below content size

### SVG Favicons with Dark Mode
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="...">
  <style>
    path { fill: #1A1918; }
    @media (prefers-color-scheme: dark) {
      path { fill: #F2F2E7; }
    }
  </style>
  <!-- paths -->
</svg>
```

### Font Loading
- Use `font-display: swap` to prevent invisible text
- Preload critical fonts:
```html
<link rel="preload" href="fonts/Font.woff2" as="font" type="font/woff2" crossorigin>
```

### Full-Screen Mobile Menu Overlay
- Use `visibility` + `opacity` for transitions (not `display: none`)
- Fixed position the close button separately so it doesn't scroll
- Use `position: fixed` with `inset: 0` or `top/right/bottom/left: 0`

### CSS Cleanup
- Search HTML for actually-used class names before removing CSS
- Webflow exports include many unused styles - safe to remove
- Merge multiple CSS files to reduce HTTP requests

## Git Workflow

- Main branch: `main`
- Remote: GitHub (`contentiousltd/slow-content`)
- Commit messages should be concise and descriptive
- Push directly to main (no PR workflow for this project)

## Testing Checklist

Before pushing:
- [ ] Check mobile layout (especially horizontal overflow)
- [ ] Test mobile menu open/close
- [ ] Verify all links work (run link checker)
- [ ] Check font loading (no FOUT)
- [ ] Test dark mode favicon
