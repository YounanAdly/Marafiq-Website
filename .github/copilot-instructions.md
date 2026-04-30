# Project Guidelines

Angular 17+ standalone-components project. **Reuse-first by default.**

The full reusable-component, service, and design-token catalog lives in [rules.md](../rules.md). Read it before implementing any new screen or Figma handoff.

## Core Principles (always apply)

1. **Reuse before create.** Search `src/app/shared/components`, `src/app/shared/formly/custom-components`, `src/app/layouts`, and `src/app/shared/services` before writing anything new. Extend via `@Input` / Formly `props` instead of duplicating.
2. **Standalone components only.** No NgModules for new code.
3. **No hardcoded design values.** Colors, spacing, and radii come from CSS variables defined in [src/styles/themes/](../src/styles/themes/). Never inline a hex code.
4. **No hardcoded user-facing strings.** Every label/message uses an ngx-translate key in both [en.json](../src/assets/i18n/en.json) and [ar.json](../src/assets/i18n/ar.json). RTL must work.
5. **No inline Formly field arrays.** Every page form lives in a co-located `form.json`. See [formly forms instructions](./instructions/formly-forms.instructions.md).
6. **No direct HttpClient in components.** Use [base-crud.service.ts](../src/app/shared/services/base-crud.service.ts) or a dedicated service.
7. **Endpoints come from constants.** Add new ones to [src/app/app/constants.ts](../src/app/constants.ts), never inline string URLs.
8. **Language-prefixed routes only.** All routes are nested under `/:lang/...` — use `LanguageService` for navigation.

## Architecture

- Bootstrap: [src/main.ts](../src/main.ts), [src/app/app.config.ts](../src/app/app.config.ts)
- Routing: [src/app/app.routes.ts](../src/app/app.routes.ts)
- Layout shell: [src/app/layouts/header](../src/app/layouts/header), [src/app/layouts/footer](../src/app/layouts/footer)
- Shared reusable zone: [src/app/shared/](../src/app/shared/)
- Public pages: [src/app/public/](../src/app/public/)

## Build & Test

- `npm start` — dev server
- `npm test` — unit tests
- `npm run build` — production build

## Maintenance Rule

After adding or changing a reusable component, service, Formly type, or theme token, update [rules.md](../rules.md) **in the same task**. Never finish a design-to-code task without checking whether the catalog needs a delta.

## When in Doubt

- Forms / Formly → [.github/instructions/formly-forms.instructions.md](./instructions/formly-forms.instructions.md)
- SCSS / theming → [.github/instructions/styling-themes.instructions.md](./instructions/styling-themes.instructions.md)
- Shared components & services → [.github/instructions/shared-reuse.instructions.md](./instructions/shared-reuse.instructions.md)
- i18n strings → [.github/instructions/i18n.instructions.md](./instructions/i18n.instructions.md)
