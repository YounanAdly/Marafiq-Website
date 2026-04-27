# Reuse-First Rules For This Angular Project

Purpose: this file is the single source of truth for project structure and reusable assets.

When implementing a new Figma design, always read this file first and reuse existing components/services before creating new ones.

---

## 1) Project Structure (Verified)

### Root
- `angular.json`, `package.json`, `tsconfig*.json`: Angular workspace config.
- `src/main.ts`, `src/main.server.ts`, `src/server.ts`: app bootstrap (browser + server).

### App Layer
- `src/app/app.component.*`: root shell, skip-link accessibility, conditional header/footer visibility by route.
- `src/app/app.routes.ts`: language-prefixed routing (`/:lang/...`).
- `src/app/app.config.ts`: global providers, HTTP interceptors, Formly module, PrimeNG, translate provider, theme initializer.
- `src/app/constants.ts`: central endpoint keys for common API paths.

### Config
- `src/app/config/app.config.ts`: runtime feature toggles (language/theme/font-size) and defaults.
- `src/app/translate.config.ts`: ngx-translate loader setup.

### Layouts
- `src/app/layouts/header/*`: reusable header shell.
- `src/app/layouts/footer/*`: reusable footer shell.

### Public Pages
- `src/app/public/home/*`: routed home page (`/:lang/home`) with empty starter layout and language/theme/font controls; header/footer are provided by root app shell.
- `src/app/public/contact-us/*`: static contact page placeholder.
- `src/app/public/login/*`: standalone login UI based on Figma assets.
- `src/app/public/create-account/*`: standalone create-account UI reusing login shell + Formly custom-input + shared button.

### Shared (Primary Reuse Zone)
- `src/app/shared/components/*`: reusable standalone visual components.
- `src/app/shared/formly/*`: dynamic form system and custom field types.
- `src/app/shared/services/*`: reusable business/platform services.
- `src/app/shared/interceptors/*`: cross-cutting HTTP behaviors.
- `src/app/shared/guards/*`: route protection logic.

### Styling & Localization
- `src/styles/global.theme.scss`: global typography/accessibility/loading classes.
- `src/styles/themes/_light-theme.scss`, `_dark-theme.scss`, `_green-theme.scss`: CSS variable theme classes.
- `src/assets/i18n/en.json`, `src/assets/i18n/ar.json`: translation catalogs.

#### Design Token CSS Variables (defined in all three theme files)
| Variable | Value (light) | Figma token |
|---|---|---|
| `--color-teal` | `#008c98` | Primary/blue |
| `--color-primary-blue` | `#0076bf` | Primary/Blue (section kicker) |
| `--color-teal-dark` | `#00788b` | Secondary/Dark Green |
| `--color-orange` | `#e8a712` | Primary/Orange |
| `--color-dark-blue` | `#083a81` | Secondary/Dark Blue |
| `--color-body-text` | `#2b2b2b` | Black #2b2b2b |
| `--color-gray` | `#959ca2` | Secondary/Gray |
| `--color-light-green` | `#5db4bb` | Light Green |
| `--color-otp-border` | `#b3dde0` | Secondary Color |
| `--color-modal-bg` | `#ffffff` | White (modal card — theme-invariant) |
| `--color-modal-input-bg` | `#ffffff` | White (OTP input bg — theme-invariant) |
| `--color-input-border` | `#e0e0e0` | Login/Create-account input outline |
| `--color-orange-hover` | `#cf9210` | Primary/Orange hover state |
| `--color-page-backdrop` | `#001a3f` | Auth page base background |
| `--color-overlay-start` | `rgba(0, 26, 63, 0)` | Auth hero overlay start |
| `--color-overlay-mid` | `rgba(0, 120, 139, 0.536)` | Auth hero overlay mid |
| `--color-overlay-end` | `rgba(0, 26, 63, 0.8)` | Auth hero overlay end |
| `--color-inquiry-surface-start` | `#15a0ec` | Home inquiry card gradient start |
| `--color-inquiry-surface-end` | `#0084d4` | Home inquiry card gradient end |
| `--color-inquiry-glow` | `rgba(213, 237, 242, 0.78)` | Home inquiry card top glow |
| `--color-complaint-card-warm` | `#fff1dd` | Home complaints warm card background |
| `--color-complaint-card-sky` | `#b5efff` | Home complaints sky card background |
| `--color-section-soft-bg` | `#ebf6f7` | Soft section background |

> **Rule**: Never hardcode these hex values in component SCSS. Always reference via `var(--color-*)`.  
> `--color-modal-bg` and `--color-modal-input-bg` are intentionally `#ffffff` in all themes because the modal card is always rendered as a white surface (dark-theme only darkens the page background behind it).

---

## 2) Reusable Components Inventory

### Layout Components
1. Header
    - File: `src/app/layouts/header/header.component.ts`
    - Selector: `app-header`
    - Reuse for all authenticated/public shells unless a page explicitly hides it.
2. Footer
    - File: `src/app/layouts/footer/footer.component.ts`
    - Selector: `app-footer`
    - Reuse for all shells except routes intentionally excluded.
    - Reusable inputs: `logoSrc`, `menuLinks`, `contactInfo`, `socialLinks`, `legalLinks`.
    - Behavior: language-aware route building, ngx-translate labels, RTL-ready layout, and theme-token-based gradient/background styles.

### Shared UI Components
1. Global Loader
    - File: `src/app/shared/components/loader.type.ts`
    - Selector: `app-global-loader`
    - Reuse for global async feedback; controlled by `LoaderService` and `loaderInterceptor`.
2. Card
    - File: `src/app/shared/components/card.component.ts`
    - Selector: `app-card`
    - Reuse for content cards. Supports reusable inputs: `title`, `subtitle`, `imageSrc`, `customClass`.
3. Map
    - File: `src/app/shared/components/maps.type.ts`
    - Selector: `app-map`
    - Reuse when map/marker behavior is needed; do not recreate map logic in pages.
4. Reusable Button
    - File: `src/app/shared/components/button.component.ts`
    - Selector: `app-button`
    - Variants: `login-primary`, `login-outline`, `action-primary`, `action-outline`, `otp-verify`, `service-apply`.
    - Use `fullWidth: true` for full-width login actions.
    - Use `otp-verify` for compact OTP/verification modal primary actions.
    - Use `service-apply` for compact CTA buttons inside service offering cards (`226x35`, radius `20`).
5. Service Offering Card
    - File: `src/app/shared/components/service-offering-card/service-offering-card.component.ts`
    - Selector: `app-service-offering-card`
    - Reuse for Home/services-style cards with full-bleed background image, bottom translucent gradient/blur text overlay, and CTA layout.
    - Reusable inputs: `titleKey`, `descriptionKey`, `imageSrc`, `imageAltKey`, `actionLabelKey`.
    - Reusable output: `apply`.
6. OTP Modal
    - File: `src/app/shared/components/otp-model/otp-modal.component.ts`
    - Selector: `app-otp-modal`
    - Reuse for OTP verification popups on auth flows (`login`, `create-account`) instead of page-level duplicated OTP markup/logic.
    - Emits `verified` and `closed` outputs; accepts `maskedMobileNumber` and configurable `otpLength`.
7. Success Alert Modal
    - File: `src/app/shared/components/success-alert/success-alert-modal.component.ts`
    - Selector: `app-success-alert-modal`
    - Reuse for post-action confirmation popups (for example: account-created confirmation with Done CTA).
8. Media Center Section
    - File: `src/app/shared/components/media-center-section/media-center-section.component.ts`
    - Selector: `app-media-center-section`
    - Reuse for media/news gallery blocks with featured video preview modal and responsive card layout.
    - Reusable outputs/behaviors: click-to-open full-screen video preview, language-aware "View More" navigation.

### Reusable Formly Field Types (Registered)
Source of truth: `src/app/shared/formly/formly-config.module.ts`

1. `custom-input`
    - File: `src/app/shared/formly/custom-components/custom-input.type.ts`
    - Reusable props: `variant`, `dimmed`, `disabled`, `prefixIconSrc`, `type`, `inputmode`, `autocomplete`.
2. `custom-dropdown`
    - Active file: `src/app/shared/formly/custom-components/drop-down/custom-dropdown.types.ts`
    - Reusable props: `placeholder`, `options`, `optionLabel`, `optionValue`, `showClear`, `dimmed`, `disabled`.
3. `custom-calendar`
    - File: `src/app/shared/formly/custom-components/custom-calendar.types.ts`
4. `custom-multiselect`
    - File: `src/app/shared/formly/custom-components/custom-multiselect.types.ts`
5. `searchable-select`
    - File: `src/app/shared/formly/custom-components/custom-searchable-select.types.ts`
6. `file`
    - File: `src/app/shared/formly/custom-components/custom-file.types.ts`
    - Reusable props: `multiple`, `accept`, `maxFileSize`, `chooseLabel`, `dimmed`.

Important note:
- There is a duplicate dropdown implementation at `src/app/shared/formly/custom-components/custom-dropdown.types.ts`.
- Reuse and edit the registered dropdown path under `drop-down/` first unless a cleanup task explicitly removes duplication.

### Formly Reuse Helpers
1. Formly config registration
    - File: `src/app/shared/formly/formly-config.module.ts`
2. Translation extension
    - Files: `src/app/shared/formly/formly.validation.ts`, `src/app/shared/formly/formly.translate-extension.ts`
3. Common validators
    - File: `src/app/shared/formly/formly.validators.ts`
    - Standard reusable rules include `emailPattern`, `numbersOnly`, `fullNamePattern`, `mobileNumberLength`.
4. Field mutation helper service
    - File: `src/app/shared/services/formly.service.ts`

### JSON-Driven Form Configuration (Mandatory Pattern)
Every page that renders a Formly form MUST define its field configurations in a `form.json` file co-located with the page component, not inline in TypeScript.

**Rule**: Do NOT define `FormlyFieldConfig[]` arrays inline in component TypeScript. Every form field (including labels, placeholders, validators, props, and type) must live in a `form.json` file.

Pattern (followed by `create-account` and `login`):
1. Create `form.json` in the page folder (e.g., `src/app/public/my-page/form.json`).
2. Import it in the component: `import formConfig from './form.json';`
3. Assign to the fields property: `fields: FormlyFieldConfig[] = formConfig as unknown as FormlyFieldConfig[];`
4. Apply any runtime-only values (dropdown options, dynamic defaults) using `FormlyService` after load.

What belongs in `form.json`:
- `key`, `type`, `className`
- `validators.validation` (named validator string arrays)
- All `props` including `placeholder` (translation key string), `variant`, `required`, `type`, `inputmode`, `autocomplete`, `maxLength`, `pattern`, `prefixIconSrc` (static asset path string), `containerClass`, `inputClass`, `iconClass`, `dimmed`, `multiple`, `accept`, `maxFileSize`, `chooseLabel`, etc.

What stays in TypeScript (set programmatically after load):
- Dropdown `options` arrays (via `FormlyService.setDropdownValue()`)
- Any prop that depends on a runtime variable or API response.

Existing `form.json` references:
- `src/app/public/create-account/form.json`
- `src/app/public/login/form.json`

---

## 3) Reusable Services Inventory

1. API base CRUD abstraction
    - `src/app/shared/services/base-crud.service.ts`
    - Reuse for API GET/POST/PUT/DELETE before writing direct HTTP calls.
2. Auth/session state
    - `src/app/shared/services/auth.service.ts`
    - Reuse token/contact cache and auth signals.
3. Language orchestration
    - `src/app/shared/services/language.service.ts`
    - Reuse URL language sync, direction (`ltr/rtl`), cookie handling.
4. Theme management
    - `src/app/shared/services/theme.service.ts`
    - Reuse theme class switching and cookie persistence.
5. Global loading state
    - `src/app/shared/services/loader.service.ts`
    - Reuse computed loading signal with interceptor integration.
6. SEO metadata
    - `src/app/shared/services/seo.service.ts`
    - Reuse for page-level title/meta updates.
7. Font scaling
    - `src/app/shared/services/font-size.service.ts`
    - Reuse central font-size behavior from config.
8. Browser utilities
    - `src/app/shared/services/common.service.ts`
    - Reuse cookie/localStorage access wrappers.

### Cross-Cutting Reuse
1. Auth headers + language header injector
    - `src/app/shared/interceptors/auth.interceptor.ts`
2. Global loader HTTP hook
    - `src/app/shared/interceptors/loader.interceptor.ts`
3. Route guard
    - `src/app/shared/guards/auth.guard.ts`

---

## 4) Mandatory Reuse Workflow For Any New Design

Use this workflow every time a new Figma design is provided.

1. Classify the design blocks
    - Layout shell (header/footer/page frame)
    - Content cards/sections
    - Form controls
    - Utility widgets (map, loader, file upload)
2. Check existing reusable inventory in this file first.
3. Search matching implementation in:
    - `src/app/shared/components`
    - `src/app/shared/formly/custom-components`
    - `src/app/layouts`
    - `src/app/shared/services`
4. If match exists:
    - Extend existing component via `@Input`, variant classes, or Formly `props`.
    - Keep business logic in existing service/component.
5. If no exact match:
    - Check if existing component can be generalized safely.
    - Only create a new reusable component if extension would harm readability/maintainability.
6. Register and integrate properly:
    - For new Formly fields, register in `FormlyConfigModule`.
    - For page text, wire to translation keys.
    - For theme-sensitive styles, use CSS variables/theme classes.

---

## 5) Creation Rules (Strict)

1. Do not duplicate existing logic.
2. Prefer extending existing reusable components over creating page-specific copies.
3. New UI component must be standalone and reusable by at least one additional screen path.
4. New form control must be implemented as a Formly custom type when it belongs to dynamic forms.
5. New page-level SEO should use `SeoService`.
6. New language-visible text must use translation keys (`en.json`/`ar.json`).
7. Theme-aware colors should use CSS variables in theme files instead of hard-coded values when possible.
8. **Any page with a Formly form must define its fields in a co-located `form.json` file.** Never define `FormlyFieldConfig[]` arrays inline in TypeScript. Import the JSON and cast: `formConfig as unknown as FormlyFieldConfig[]`. This applies to every label, placeholder, prop, validator, and field type.

---

## 6) Figma Handoff Protocol

When a Figma link + component name is provided:

1. Read this rules file first.
2. Map requested component name to nearest existing reusable component/type.
3. Propose one of these outcomes:
    - Reuse existing component with style-only edits.
    - Reuse existing component with small API extension (`@Input`/Formly `props`).
    - Create a new reusable component (only if no safe extension path exists).
4. Explain where the edited/new reusable component will live and how other pages will consume it.
5. If a new reusable pattern appears in the design, add it to this file after implementation.

---

## 7) Quick Reuse Entry Points

- Shared UI first: `src/app/shared/components`
- Dynamic form controls first: `src/app/shared/formly/custom-components`
- Layout shell first: `src/app/layouts`
- Shared logic first: `src/app/shared/services`
- Theme tokens first: `src/styles/themes`

This project is reuse-first by default.

---

## 8) Rules Maintenance (Mandatory)

1. After any reusable-component or reusable-style edit, update this file in the same task.
2. Add any new reusable inputs/props/variants to the relevant inventory section.
3. If a new default behavior is introduced (for example dimmed field state), document the expected flag name and usage.
4. If an implementation replaces a previous pattern, mark the old pattern as deprecated in this file.
5. Never finish a design-to-code task without checking whether this file needs a delta update.
