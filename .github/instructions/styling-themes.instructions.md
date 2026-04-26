---
description: "Use when writing or editing SCSS, component styles, theme files, or anything visual. Enforces design tokens, theme variables, and RTL-safe layout."
applyTo: "src/**/*.scss"
---

# Styling & Theming

## Hard Rule: No Hardcoded Design Values

Never inline a hex color, rgba, or theme-sensitive value in a component SCSS. Use CSS variables from the theme files:

- [_light-theme.scss](../../src/styles/themes/_light-theme.scss)
- [_dark-theme.scss](../../src/styles/themes/_dark-theme.scss)
- [_green-theme.scss](../../src/styles/themes/_green-theme.scss)

```scss
/* GOOD */
color: var(--color-body-text);
background: var(--color-section-soft-bg);

/* BAD */
color: #2b2b2b;
background: #ebf6f7;
```

## Token Catalog

Full token table is in [rules.md](../../rules.md) §1 "Design Token CSS Variables". If you need a token that doesn't exist:

1. Add it to **all three** theme files with the correct per-theme value.
2. Add a row to the token table in `rules.md`.
3. Then use `var(--color-*)` in the component SCSS.

## Theme-Invariant Tokens

`--color-modal-bg` and `--color-modal-input-bg` are intentionally `#ffffff` in every theme — modal cards always render on a white surface. Don't "fix" them.

## Global vs Component Styles

- Typography, accessibility helpers, loader classes → [global.theme.scss](../../src/styles/global.theme.scss).
- Component-specific styles → component SCSS file, scoped via Angular's view encapsulation.
- Don't add app-wide selectors from a component file.

## RTL

The app supports Arabic (RTL). Prefer logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-*`) over `left`/`right`. Test mirrored layouts before finishing.
