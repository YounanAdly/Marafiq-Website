---
description: "Use when creating or editing Angular components, services, guards, interceptors, or any TypeScript in src/app. Enforces reuse-first inventory check and standalone-component patterns."
applyTo: "src/app/**/*.ts"
---

# Shared Component & Service Reuse

The reuse inventory lives in [rules.md](../../rules.md) §2–§3. Read it before authoring a new component or service.

## Workflow Before Writing Code

1. **Classify** the new piece: layout shell, content card, form control, utility widget, or business service.
2. **Search** the matching folder:
   - UI → [src/app/shared/components](../../src/app/shared/components)
   - Form fields → [src/app/shared/formly/custom-components](../../src/app/shared/formly/custom-components)
   - Layout → [src/app/layouts](../../src/app/layouts)
   - Logic → [src/app/shared/services](../../src/app/shared/services)
3. **Extend before creating.** Add a variant, an `@Input`, or a Formly prop instead of cloning a component.
4. **Only create new** if extension would harm readability/maintainability — and the new piece must be reusable by at least one additional screen.

## Component Conventions

- All new components are `standalone: true`.
- Selector prefix: `app-`.
- Inputs: prefer `input()` signal API for new components when possible; otherwise `@Input()`.
- Outputs: emit via `output()` / `EventEmitter`.
- Avoid logic in templates beyond simple bindings; push it into the component class or a service.

## Service Conventions

- HTTP: never call `HttpClient` directly from a component. Go through [base-crud.service.ts](../../src/app/shared/services/base-crud.service.ts) or a dedicated feature service.
- Endpoints: import keys from [src/app/constants.ts](../../src/app/constants.ts). Add new endpoints there, not as inline string URLs.
- Auth state: read from [auth.service.ts](../../src/app/shared/services/auth.service.ts), do not parse tokens locally.
- Loading state: use [loader.service.ts](../../src/app/shared/services/loader.service.ts) — automatic via `loaderInterceptor` for HTTP.

## Routing

- All routes are language-prefixed (`/:lang/...`).
- Use [language.service.ts](../../src/app/shared/services/language.service.ts) for navigation that needs the current lang.
- Protect authenticated routes with [auth.guard.ts](../../src/app/shared/guards/auth.guard.ts).

## SEO

- Page-level `<title>` and meta tags go through [seo.service.ts](../../src/app/shared/services/seo.service.ts).

## After Adding/Changing a Reusable Piece

Update [rules.md](../../rules.md) inventory in the same task. New `@Input`s, new variants, and new defaults must be documented.
