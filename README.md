# ResumeBuilder

A dynamic resume builder application built with Angular, allowing users to create professional resumes with multiple education and employment sections.

## Project Overview

**ResumeBuilder** is a comprehensive resume creation tool that provides an intuitive interface for building professional resumes. Users can input personal information, education details (with course specializations), employment history, and other professional information. The application supports multiple education and employment entries with dynamic form fields.

## Technology Stack

### Frontend Framework

- **Angular**: 10.2.5 - Modern web application framework
- **TypeScript**: 4.0.2 - Strongly typed programming language
- **RxJS**: 6.6.0 - Reactive programming library

### UI & Styling

- **Angular Material**: 10.2.7 - Material Design components
- **Angular CDK**: 10.2.7 - Component Development Kit
- **Bootstrap**: 5.3.3 - CSS framework
- **ng-bootstrap**: 1.6.3 - Angular Bootstrap integration
- **SCSS**: Preprocessor for enhanced CSS styling

### External APIs

- **REST Countries API** - For country data and search
- **Zip Code API** - For state/city lookup by postal code

### Testing & Quality

- **Karma**: 5.0.0 - Test runner
- **Jasmine**: 3.6.0 - Testing framework
- **Protractor**: 7.0.0 - End-to-end testing framework
- **TSLint**: 6.1.0 - Code quality checker

## Project Structure

```
src/
├── app/
│   ├── home/                          # Home component
│   ├── resume/                        # Resume management
│   │   ├── form/                      # Resume form component
│   │   ├── view/                      # Resume view/display
│   │   ├── resume.service.ts          # Resume data service
│   │   └── resume.ts                  # Resume model
│   ├── section/                       # Reusable form sections
│   │   ├── dynamic-material-form/     # Dynamic form generator
│   │   └── form-layout/               # Form layout wrapper
│   ├── util/                          # Utility components & pipes
│   │   ├── camel-to-title.pipe.ts     # String transformation pipe
│   │   ├── text-input/                # Text input component
│   │   └── text-select/               # Select dropdown component
│   ├── constants/                     # Constants
│   │   └── resume.constants.ts        # Resume field configurations
│   └── environments/                  # Environment configs
├── assets/
│   ├── resume-schema.json             # Resume JSON schema
│   └── schema.json                    # Form schema configuration
└── styles.scss                        # Global styles
```

## Key Features

- **Dynamic Resume Form**: Create multiple education and employment entries
- **Course Specializations**: Contextual course selections based on education program (BA, B.Sc., B.E., etc.)
- **Indian Education Support**: Comprehensive course classifications for UG, PG, and Doctorate levels
- **Location Search**: Country search with external API (minimum 3 characters)
- **Auto-fill Location**: State and city auto-populated using postal code
- **Material Design UI**: Clean and professional interface using Angular Material
- **Responsive Layout**: Mobile-friendly resume builder
- **Resume Preview**: View formatted resume before download
- **Download Resume**: Export resume as PDF (future release)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Alternatively, run `npm start` which uses port 4201 for faster development.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

## Future Releases

- Export resume as formatted PDF with print-ready layout.
- Postal code auto-fill to populate state and city from PIN/ZIP via external API.
- Digital signature pad on the Personal Details declaration field.
- AI-generated career objective / professional summary (currently shown as disabled "Future Phase" card).
- Skill auto-recommendations based on entered job title.
- Export resume data to LinkedIn profile format.
- API backend for resume persistence with auto-delete after 24 h and email delivery.
- Highest Educational Qualification and Total Years of Experience fields (landing Step 5 disabled cards).
- Multi-language / localization support.

---

## Known Bugs / Issues

- `onSubmit()` flips `isExperienced` incorrectly for Freshers — flag is already set in `ngOnInit`; the `!isExperienced` toggle in `onSubmit` makes it `true` for Fresher users post-submit. *(tracked)*
- `educationSpecializations` index map is not re-indexed after entry deletion — removing an education entry at index N leaves stale indices causing wrong specializations for subsequent entries. *(tracked)*
- `skillsKnown` FormArray collects values but has no display or recommendation logic wired in the view component. *(tracked)*

---

## Vulnerabilities

| Severity | Location | Issue |
|----------|----------|-------|
| ~~**Severe**~~ ✅ Fixed | `form.component.ts` `createResume()` | Wrong sessionStorage key `'summaryData'` (never set); always stored `null` as `summaryData` — fixed to `'resumeSummary'`. |
| ~~**Severe**~~ ✅ Fixed | `view.component.ts` `ngOnInit()` | `JSON.parse(getResume())` with no null guard — direct navigation to `/resume/view` loaded `null` silently; fixed with early return. |
| ~~**Severe**~~ ✅ Fixed | `form.component.ts`, `view.component.ts` | `console.log` printed full PII (name, email, phone, DOB) to browser DevTools in all builds — removed. |
| ~~**Severe**~~ ✅ Fixed | `form.component.ts` `ngOnInit()` | `JSON.parse(summaryData)` without try-catch — malformed sessionStorage (e.g. from XSS or extension) caused unhandled exception blocking redirect; wrapped in try-catch with landing redirect. |
| **Medium** | `landing.component.ts` file upload | No client-side MIME type validation — `accept=".txt,.doc,.docx"` is HTML-only and easily bypassed by renaming files. |
| **Low** | `landing.component.ts`, `form.component.ts` | PII (name, email, summary) stored as plaintext in `sessionStorage` — readable by any same-origin JavaScript. |
| **Low** | `form.component.ts` | `(window as any).appConfig` accessed without integrity check — tampered config could disable entry limits. |

---

## Version History

### v1.5.0 — 2026-05-26 (Minor)

Fixed a runtime JIT compilation crash caused by invalid Angular template syntax (`#auto{{field.id}}` in `dynamic-material-form.component.html`) and missing `MatListModule` in `SectionModule` — both caused AOT to fail silently, leaving components uncompiled at runtime. Added multi-language education preferences on landing Step 5: users can select any of 60+ country education systems to display localised education level names in the resume form, with the preference saved to sessionStorage and applied to the first education entry via `EducationService.getEducationCountries()`. Also added `courseNameOther` and `programNameOther` conditional fields that appear when "Others" is selected in the respective education dropdowns.

---

### v1.4.0 — 2026-05-26 (Patch)

Fixed all TypeScript compilation errors caused by service restructuring: `resume.service.ts` and `location.service.ts` moved to `resume/services/`, all import paths updated across `form.component.ts`, `view.component.ts`, `app.component.ts`, and `camel-to-title.pipe.spec.ts`. Also patched four severe vulnerabilities — wrong `sessionStorage` key in `createResume()`, missing null guard in `view.component.ts`, and `console.log` PII leaks in two components.

---

### v1.3.9 — 2026-05-25 (Patch)

Fixed critical bugs in `shouldShowField`, `onProgramChange`, and `onDynamicFieldChange` that broke the Course Name → Program → Field/Major cascade in the education form. Corrected value extraction logic, the `in` operator target for `PROGRAMS_BY_LEVEL`, and restored the empty-value guard so State/City fields correctly hide until Country is selected.

---

### v1.3.8 — 2026-05-25 (Patch)

Replaced disabled `Next` buttons in inner steppers with `markAllTouched()` click handlers to surface validation errors visually. Added education From/To dates side-by-side, email domain datalist suggestions on the landing page, and fixed the Course → Program Name cascade to populate all programs instead of returning empty.

---

### v1.3.7 — 2026-05-25 (Patch)

Added `date` type support to `app-text-input` so the `dateOfBirth` field renders correctly instead of showing a fallback. Replaced the raw checkbox declaration field with `app-text-input type="checkbox"` and fixed a `getErrorMessage()` no-args crash in the textarea section.

---

### v1.3.6 — 2026-05-25 (Patch)

Added `PROGRAMS_BY_LEVEL` (key-value map) and `ALL_PROGRAMS` (flat array) to `resume.constants.ts` so the Program Name dropdown includes all programs, not just the 9 with specializations. Updated `getFieldValues` to use `ALL_PROGRAMS` for the `program` values source.

---

### v1.3.5 — 2026-05-25 (Patch)

Resolved 7 TypeScript strict-mode build errors that caused a blank screen. Key fixes: nullable `validators` in the `CustomFields` interface, `!` definite-assignment assertions on FormGroup properties, and a corrected return type for `isOtherFieldSelected`.

---

### v1.3.4 — 2026-05-25 (Minor)

Replaced the landing page's all-at-once layout with a 5-step card wizard featuring step progress indicators and inline field validation on required fields. Step 4 for experienced users gained three professional summary options — Write Custom, Upload File, and a future-phase AI Generated card.

---

### v1.3.3 — 2026-05-25 (Patch)

Fixed the `ControlValueAccessor` bug in `text-select` that silently blocked all cascade dropdowns (program → specialization, country → state → city). Added per-entry location maps to prevent entries sharing state/city data, an email field on the landing page, and restructured objective selection into 4-option cards with type-specific sub-steps.

---

### v1.3.2 — 2026-05-25 (Minor)

Replaced all hardcoded education/experience HTML fields with `*ngFor` dynamic rendering driven by `form.fields.ts` configuration, adding `fieldType`, `valuesSource`, and `dependsOn` metadata for progressive disclosure and cascade logic. Integrated Angular Material date picker and created `FORM_ARCHITECTURE.md` documenting the full dynamic form system.

---

### v1.3.1 — 2026-05-25 (Patch)

Added career objective file upload (.txt/.doc/.docx), checkbox auto-prefill for experienced users, and `appConfig` entry limits (max 5 educations/experiences) with delete entry buttons. Created `resume.model.ts` with 7 centralized TypeScript interfaces for type safety across components.

---

### v1.3.0 — 2026-05-25 (Minor)

Introduced the landing page with experience type selection (Experienced/Fresher) and 40+ career objective templates across 13 job categories. The resume form is now gated behind the landing page via session storage validation.

---

### v1.2.0 — 2026-05-25 (Minor)

Migrated version management from `version.constants.ts` to `config.js` and added Skills Summary/Known FormArrays. Introduced a Personal Details page (gender, date of birth, father's name, address) with a required declaration checkbox.

---

### v1.1.1 — 2026-05-25 (Patch)

Removed postal code fields from education/experience forms and fixed default select placeholder text. Corrected duplicate "Version History" headings in `README.md` and created the `story.md` governance document.

---

### v1.1.0 — 2026-05-25 (Minor)

Integrated the `country-state-city` package to replace static location constants and created `LocationService` for centralized location data management. Fixed `fieldMajor` specialization population for multiple education entries.

---

### v1.0.0 — 2026-05-25 (Major)

Initial stable release with a dynamic resume form supporting multiple education and employment entries, expanded Indian education course specializations, Angular Material/Bootstrap UI, and responsive design.

---

**ResumeBuilder** © 2026 | Version 1.5.0