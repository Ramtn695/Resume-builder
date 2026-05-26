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

## Version History

### Version 1.3.8 - 2026-05-25 (Patch Update)

**Education Form — shouldShowField / Program Cascade Bug Fixes**

**Root Cause:** User had edited `shouldShowField`, `onProgramChange`, and `onDynamicFieldChange` introducing a broken `.split(':')[1]` pattern and other logic errors that prevented the entire program/specialization/state/city cascade from working.

**Bugs Fixed:**

- **`shouldShowField` — broken value extraction** — `val.toString().trim().split(':')[1]` returned `undefined` for every plain string value (e.g. `"U.G."`, `"Bachelor of Arts (BA)"` contain no `:`). Replaced with `Array.isArray(val) ? (val[0] || '') : String(val)` to get the actual value.
- **`shouldShowField` — wrong `in` operator target** — `strVal in (Object.keys(PROGRAMS_BY_LEVEL) as string[])` used `in` on an array which checks numeric indices, not values. Changed to `strVal in (PROGRAMS_BY_LEVEL as Record<string, string[]>)` to check object keys correctly.
- **`shouldShowField` — empty value guard commented out** — The check `if (!strVal.trim() || strVal === 'null') return false` was commented out, causing `institutionState` and `institutionCity` to always display even before a country was selected. Restored.
- **`shouldShowField` — `conditional` fields not suppressed** — `fieldMajorOther` (marked `conditional: true`) was rendering as a standalone text input on every loop iteration. Added `if (field.conditional) return false` so it is suppressed from the `*ngFor` and only appears via the parent field's `otherField` + `isOtherFieldSelected` mechanism.
- **`onProgramChange` — broken `.split(':')[1]`** — Same pattern caused `programName.split(':')[1]` to return `undefined`, then `.replace(...)` threw a runtime `TypeError`. Removed the parse; uses the program name value directly for SPECIALIZATION_MAP lookup.
- **`onDynamicFieldChange` — invalid `shouldShowField` call** — Called `this.shouldShowField(fieldId, formGroup)` passing a `string` as the first argument (expects a field config object). Removed this no-op call.
- **`getProgram` — console.log spam removed** — Removed two `console.log` statements left from debugging.

**Net Effect:** Course Name → Program Name → Field/Major cascade now works correctly. State/City fields are hidden until Country is selected.

**Files Modified:**

- `src/app/resume/form/form.component.ts` — `shouldShowField()`, `onProgramChange()`, `onDynamicFieldChange()`, `getProgram()`
- `package.json` — Version bumped to 1.3.9
- `src/assets/config.js` — appVersion updated to 1.3.9

---

### Version 1.3.8 - 2026-05-25 (Patch Update)

**mat-stepper Errors, Education Date Row, Email Suggestions, Course→Program Cascade**

**Changes:**

- **mat-stepper error display** — `Next` buttons in Education and Experience inner steppers previously had `[disabled]="form.invalid"`, silently blocking navigation with no visual feedback. Replaced with `(click)="markAllTouched(formGroup)"`. `markAllTouched()` calls `FormGroup.markAllAsTouched()` so all field error messages appear immediately when Next is clicked; the linear stepper still blocks advancing.
- **Education From/To dates on same row** — `dateFrom` and `dateTo` fields in the Education section now render side-by-side in a two-column Bootstrap row (`col-6` each) using separate `mat-datepicker` instances (`#eduFromPicker`, `#eduToPicker`). The `dateTo` iteration slot in `*ngFor` renders nothing (already included in the `dateFrom` block).
- **Email domain suggestions** — Landing page email field now has `list="emailDomainList"` linked to a `<datalist>`. As the user types a local part (e.g. `john`), the browser suggests `john@gmail.com`, `john@outlook.com`, `john@yahoo.com`, `john@hotmail.com` via the `emailSuggestions` getter in `landing.component.ts`.
- **Course → Program Name cascade** — `getProgram()` was always returning `[]`. Now returns `PROGRAMS_BY_LEVEL[courseNameValue]` (UG_COURSES / PG_COURSES / DOCTORATE_COURSES). For ITI, SSLC, Diploma, HSC, Others — `programName` is hidden because those levels have no entries in `PROGRAMS_BY_LEVEL`.
- **shouldShowField — program/specialization visibility** — Updated to hide `programName` when the selected course level is not in `PROGRAMS_BY_LEVEL`, and to hide `fieldMajor` when the selected program has no entries in `SPECIALIZATION_MAP`.
- **courseName change cascade** — `onDynamicFieldChange` now resets `programName`, `fieldMajor`, `fieldMajorOther`, and `educationSpecializations[index]` when `courseName` changes.
- **`isOtherFieldSelected` bug fix** — Was checking `=== 'other'` but all option lists end with `'Others'`. Changed to `.startsWith('other')` so the "Specify Field/Major" text input now correctly appears.
- **`PROGRAMS_BY_LEVEL` imported** — Added to imports in `form.component.ts`.

**Files Modified:**

- `src/app/resume/form/form.component.ts` — `markAllTouched()`, `getProgram()`, `shouldShowField()`, `onDynamicFieldChange()` (courseName), `isOtherFieldSelected()`, import `PROGRAMS_BY_LEVEL`
- `src/app/resume/form/form.component.html` — Education date row (col-6/col-6), Next button `markAllTouched` click handlers
- `src/app/landing/landing.component.ts` — `emailDomains` array, `emailSuggestions` getter
- `src/app/landing/landing.component.html` — `list="emailDomainList"` + `<datalist>` with `*ngFor`
- `package.json` — Version bumped to 1.3.8
- `src/assets/config.js` — appVersion updated to 1.3.8

---

### Version 1.3.7 - 2026-05-25 (Patch Update)

**Personal Details — All Inputs Use `app-text-input`**

**Changes:**

- **`app-text-input` — `date` type support added** — `'date'` added to the `textType` check list in `text-input.component.ts`. Previously `type="date"` fell through all checks, rendering the "No Input Fields..." fallback. `dateOfBirth` field now renders correctly.
- **`app-text-input` — `values` default empty array** — `@Input() values!: string[]` changed to `@Input() values: string[] = []` to prevent crash when values are not passed.
- **`app-text-input` — `fieldName`/`type` definite assignment** — Added `!` assertions to `@Input() fieldName` and `@Input() type` to fix strict-mode errors.
- **`app-text-input` — `getErrorMessage()` no-args bug fixed** — Textarea section called `getErrorMessage()` with no arguments; changed to `getErrorMessage(formControl, fieldName)`.
- **Personal Details `declaration` field** — Replaced raw `<input type="checkbox">` with `<app-text-input type="checkbox">`, passing declaration text as the `[values]` array.
- **`declarationValues`** — Added to `form.component.ts` so the declaration text is bound from the component, not hardcoded in the template.

**Personal Details — All Fields Now Using Reusable Components:**

| Field | Component | Type |
|-------|-----------|------|
| gender | `app-text-select` | select |
| dateOfBirth | `app-text-input` | date |
| fathersName | `app-text-input` | text |
| address | `app-text-input` | textarea |
| declaration | `app-text-input` | checkbox |

**Files Modified:**

- `src/app/util/text-input/text-input.component.ts` — Added `'date'` to textType, `values` default `[]`, `fieldName`/`type` `!` assertions
- `src/app/util/text-input/text-input.component.html` — Fixed `getErrorMessage()` → `getErrorMessage(formControl, fieldName)` in textarea section
- `src/app/resume/form/form.component.html` — Declaration field changed to `app-text-input type="checkbox"`
- `src/app/resume/form/form.component.ts` — Added `declarationValues` array
- `package.json` — Version bumped to 1.3.7
- `src/assets/config.js` — appVersion updated to 1.3.7

---

### Version 1.3.6 - 2026-05-25 (Patch Update)

**Courses — Key-Value Map & Flat Array Added**

**Problem:** `getFieldValues` was using `Object.keys(SPECIALIZATION_MAP)` to populate the Program Name dropdown, but `SPECIALIZATION_MAP` only contains 9 programs (those with specializations). Programs without specializations (BCom, LLB, MBA, MCA, MBBS, etc.) were missing from the dropdown.

**Changes:**

- Added `PROGRAMS_BY_LEVEL` to `resume.constants.ts` — key-value map grouping all programs by education level:

  ```
  { 'U.G.': UG_COURSES, 'P.G.': PG_COURSES, 'Doctorate': DOCTORATE_COURSES }
  ```

- Added `ALL_PROGRAMS` to `resume.constants.ts` — flat array of all UG + PG + Doctorate courses (spread operator concat)
- Updated `form.component.ts` — `getFieldValues` now returns `ALL_PROGRAMS` for `valuesSource === 'program'` (was `Object.keys(specializationMap)` which only returned 9 entries)
- Removed debug `console.log(this.specializationMap)` from `getFieldValues`
- Added `ALL_PROGRAMS` to the import in `form.component.ts`

**Files Modified:**

- `src/constants/resume.constants.ts` — Added `PROGRAMS_BY_LEVEL` and `ALL_PROGRAMS` exports
- `src/app/resume/form/form.component.ts` — Import `ALL_PROGRAMS`, use in `getFieldValues`, removed console.log
- `package.json` — Version bumped to 1.3.6
- `src/assets/config.js` — appVersion updated to 1.3.6

---

### Version 1.3.5 - 2026-05-25 (Patch Update)

**Build Fix — TypeScript Errors Resolved (app was not compiling)**

**Root Cause:** Build was failing with `Exit Code: 1` due to 7 TypeScript strict-mode errors introduced when `form.fields.ts` added `validators: null` for optional fields but the `CustomFields` interface required a non-null validator function.

**Errors Fixed:**

- `CustomFields` interface — `validators` type changed from `(control) => ValidationErrors | null` to `((control) => ValidationErrors | null) | null` so optional fields can use `validators: null`
- `resumeForm`, `experienceForm`, `educationForm`, `projectForm`, `otherDetails`, `personalDetailsForm` — Added `!` definite-assignment assertions (initialized in `ngOnInit`, not constructor)
- `SPECIALIZATION_MAP[programName]` — Cast to `Record<string, string[]>` to fix implicit-any index signature error
- `isOtherFieldSelected` — Fixed return type: `return fieldValue && ...` returned `string | boolean`; changed to `return !!fieldValue && ...`
- `.replace(/^./, str => ...)` — Added explicit `(str: string)` parameter type
- `JSON.parse(this.resumeService.getResume())` — Added null coalescing `|| '{}'` to handle `string | null`
- `FormUtils.fb` — Added `!` definite-assignment assertion

**Impact:** App was completely non-functional (blank screen) until this build fix.

**Files Modified:**

- `src/app/resume/form/form.fields.ts` — `CustomFields` interface `validators` type made nullable
- `src/app/resume/form/form.component.ts` — FormGroup `!` assertions, `SPECIALIZATION_MAP` cast, `isOtherFieldSelected` fix, `str` type, `JSON.parse` null guard
- `src/app/resume/form/form.utils.ts` — `fb` property `!` assertion
- `package.json` — Version bumped to 1.3.5
- `src/assets/config.js` — appVersion updated to 1.3.5

---

### Version 1.3.4 - 2026-05-25 (Minor Update)

**Landing Page — Full Wizard Redesign (Card Navigation)**

**Architecture Change:**
Replaced the sequential all-at-once display with a **single-card step wizard** (only one step visible at a time). Users navigate with Back/Next buttons; each step is locked until the previous is complete.

**Features Added:**

- **Step Progress Indicator** — Horizontal numbered circles (1–5) with connecting lines. Completed steps show green ✓, current step is highlighted white, future steps are dimmed.
- **Inline Field Validation (Step 1)** — Fields show `is-invalid` + Bootstrap `invalid-feedback` on blur or when Next is clicked with empty fields:
  - First/Last name: "First name is required." / "Last name is required."
  - Email: "Email is required." or "Please enter a valid email address." (regex format check)
- **Sequential Section Unlock** — Each step only renders when `currentStep === N`. Next button is disabled until the step is satisfied:
  - Step 1 (Your Details) → Next requires valid firstName + lastName + email
  - Step 2 (Experience Type) → Next requires selection
  - Step 3 (Agreement) → Next requires checkbox checked
  - Step 4 (Summary / Objective) → Next requires confirmed summary or objective
  - Step 5 (Additional Info) → Shows "Create Resume" button
- **Experienced — Professional Summary Options (Step 4)** — Three type-picker cards matching fresher pattern:
  - **Write Custom** — textarea with Confirm button
  - **Upload File** — file input (.txt/.doc/.docx) with auto-read preview
  - **AI Generated** — disabled card with "Future Phase" badge
- **Step 5 — Future Phase Fields** — Grayed-out disabled cards for:
  - Highest Educational Qualification (all users)
  - Total Years of Experience (experienced users only)
  - "Coming Soon" info alert; "Create Resume" button active when all prior steps complete
- **Final Button** — "✨ Create Resume" (green) shown on Step 5 instead of "Proceed"

**Bug Fixes:**

- Removed pre-existing duplicate methods (`editCareerObjective`, `removeCareerObjective`) no longer needed in wizard flow
- Fixed TypeScript index signature errors in `onCategoryChange` and `clearCareerObjective` by casting `CAREER_OBJECTIVES` to `Record<string, string[]>`

**Files Modified:**

- `src/app/landing/landing.component.ts` — Rewritten: added `currentStep`, `TOTAL_STEPS`, `stepLabels`, `fieldTouched`, `nextStep()`, `prevStep()`, `canGoNext()`, `step1Valid()`, `isValidEmail()`, `touchField()`, `fieldError()`, `emailError()`, `onProfessionalSummaryTypeChange()`, `onSummaryFileSelected()`, `completeProfessionalSummary()`; removed unused `showCareerObjectiveSection`, `editCareerObjective()`, `removeCareerObjective()`
- `src/app/landing/landing.component.html` — Fully rewritten: single-step card display, step progress indicator, inline validation messages, Step 4A (experienced) with type picker, Step 5 future phase
- `src/app/landing/landing.component.scss` — Added step circle, step connector, step badge, option card, option-future styles
- `package.json` — Version bumped to 1.3.4
- `src/assets/config.js` — appVersion updated to 1.3.4

---

### Version 1.3.3 - 2026-05-25 (Patch Update)

**Bug Fixes & Feature Additions**

**Bug Fixes:**

- **ControlValueAccessor Fix (Critical)** — `text-select.component.ts` `onInputChange` never called `this.onChange()`, meaning FormControl was never updated. This caused ALL cascade dropdowns (specialization after program, state after country, city after state) to silently fail. Fixed by calling `onChange(formValue)` before emitting `setSelected`.
- **State/City Cascade Broken** — Root cause same as above (ControlValueAccessor). Also fixed `shouldShowField()` to safely handle null/array values — calling `.trim()` on null caused runtime crash.
- **Template Binding: `(change)` → `(setSelected)`** — Dynamic field loops in `form.component.html` used native DOM `(change)` event (passed Event object), changed to `(setSelected)` custom output which emits the actual value array.
- **`onDynamicFieldChange` rawValue normalization** — Handler now normalizes rawValue: `Array.isArray(rawValue) ? rawValue[0] : String(rawValue)` to handle both array (from setSelected) and string inputs.
- **Multiple entries sharing same state/city** — Global `stateNames`/`cities` arrays were overwritten on each entry change. Replaced with per-entry maps: `educationStates[i]`, `educationCities[i]`, `experienceStates[i]`, `experienceCities[i]`.
- **"I, , agree" comma bug** — Agreement label always inserted comma+name even when name fields were empty. Fixed using `userDisplayName` getter: `I{{ userDisplayName ? ', ' + userDisplayName + ',' : '' }} agree...`
- **Checkbox auto-checked for experienced** — `agreeToTerms` was auto-set to `true` when experienced was selected. Changed to always reset to `false` — user must explicitly check for both types.

**Features Added:**

- **Email Field on Landing Page** — Step 1.0 now includes email input; stored in sessionStorage; pre-populated in resume form Step 1.
- **Step 1.4 — 4 Option Cards** — Restructured from inline options to 4 distinct cards: "Use Template", "Write Custom", "Upload File", "Create with AI" (disabled, "Future Phase" badge).
- **Step 1.5 — Type-Specific Sub-Steps** — Each Step 1.4 choice now shows its own Step 1.5 card:
  - Template → Category dropdown → Objectives list → Preview → Confirm
  - Write Custom → Textarea → Confirm
  - Upload File → File input → Read-only preview (auto-marks complete on load)
  - Create with AI → Disabled / Future Phase
- **`expOrFresher` Display in Form** — Read-only "Profile Type" field shown after lastName in form Step 1, pre-filled from sessionStorage.
- **`canProceed()` requires email** — Email is now a mandatory field for proceeding from landing page.
- **`onCareerObjectiveTypeChange` resets file state** — Switching objective type now clears `careerObjectiveFile` and `careerObjectiveCompleted`.

**Files Modified:**

- `src/app/util/text-select/text-select.component.ts` — Fixed `onInputChange` to call `this.onChange(formValue)` before emitting `setSelected`
- `src/app/resume/form/form.component.ts` — Per-entry location maps, `shouldShowField` null safety, `getFieldValues` per-entry lookup, `onDynamicFieldChange` rawValue normalization, email prefill from sessionStorage
- `src/app/resume/form/form.component.html` — `(change)` → `(setSelected)` in dynamic loops, expOrFresher read-only display in Step 1
- `src/app/landing/landing.component.ts` — Email property, `userDisplayName` getter, `agreeToTerms = false` for both types, email in `proceedToForm()`, `canProceed()` requires email, `onCareerObjectiveTypeChange` resets file state
- `src/app/landing/landing.component.html` — Step 1.0 email field, Step 1.2 agreement uses `userDisplayName`, Step 1.4 4-option card layout, Step 1.5 type-specific sub-steps
- `package.json` — Version bumped to 1.3.3
- `src/assets/config.js` — appVersion updated to 1.3.3

---

### Version 1.3.2 - 2026-05-25 (Minor Update)

**Dynamic Form Architecture Implementation**

- **Dynamic Form Rendering** - Education and experience sections now render fields from form.fields.ts configuration instead of hardcoded HTML
- **Progressive Disclosure** - Fields appear based on dependencies (e.g., Country → State → City cascade)
- **Material Date Picker** - All date inputs use Material calendar UI (native date picker)
- **Field Metadata Configuration** - form.fields.ts enhanced with:
  - `fieldType` - Determines component type (text, select, date, textarea, checkbox)
  - `valuesSource` - Determines where dropdown values come from (static, program, specialization, country, state, city)
  - `dependsOn` - Parent field that must be filled first (progressive disclosure)
  - `otherField` - Conditional "Other" text input
  - `label` - Display label for field
- **Automatic Validation** - Form validators applied consistently from field configuration
- **Conditional Field Display** - "Other" fields appear when "Other" is selected in dropdown

**Implementation Details:**

- Enhanced `src/app/resume/form/form.fields.ts` - Added fieldType, valuesSource, dependsOn, label metadata
- Added 7 new methods to `form.component.ts`:
  - `getEducationFields()` / `getExperienceFields()` - Return field configuration
  - `getFieldValues()` - Returns dropdown values based on field.valuesSource
  - `shouldShowField()` - Progressive disclosure logic
  - `onDynamicFieldChange()` - Handles cascade updates (program → specialization, country → state → city)
  - `isOtherFieldSelected()` - Check for "Other" selection
  - `getFieldLabel()` - Generate display labels from configuration
- Updated `form.component.html` - Replaced hardcoded fields with *ngFor loops:

  ```html
  <ng-container *ngFor="let field of getEducationFields()">
    <ng-container *ngIf="shouldShowField(field, education)">
      <!-- Dynamic component rendering based on field.fieldType -->
    </ng-container>
  </ng-container>
  ```

- Added Material date picker imports to `resume.module.ts`:
  - MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule
- Created `FORM_ARCHITECTURE.md` - Complete documentation of dynamic form system

**Features:**

- ✅ Single source of truth - Field definitions in one location
- ✅ Progressive disclosure - Dependent fields only show when dependencies met
- ✅ Type safety - Centralized interface definitions
- ✅ Maintainability - Field changes automatically propagate
- ✅ Extensibility - Add new fields by updating form.fields.ts
- ✅ Material calendar UI - Professional date selection
- ✅ Specialization cascade - Program selection auto-populates specialization options
- ✅ Location cascade - Country → State → City with automatic filtering

**Build Status:**

- Hash: d33a1ad47aa570e164fc
- Time: 32891ms
- Bundle: main 397 kB (+24 kB for Material calendar modules)
- Status: ✅ SUCCESSFUL - No errors

**Documentation:**

See `FORM_ARCHITECTURE.md` for comprehensive documentation including:

- Field configuration format
- Component methods reference
- Template implementation patterns
- Progressive disclosure examples
- How to add new fields
- Future enhancement suggestions

---

### Version 1.3.1 - 2026-05-25 (Patch Update)

**Bug Fixes & Enhancements:**

- **Dynamic Checkbox Auto-Prefill** - "I agree to terms" checkbox automatically checked for experienced users, unchecked for freshers
- **Career Objective File Upload** - Support for .txt, .doc, .docx file uploads with FileReader API integration
- **Parse [Placeholder] Values** - Regex-based extraction of [Value] patterns from career objectives for dynamic form fields
- **Remove Skilled Category** - Reduced career objective categories from 13 to 12 (removed Skilled category)
- **Max Entry Configuration** - Global appConfig with configurable limits: maxEducations: 5, maxExperiences: 5
- **Delete Entry Functionality** - Add delete buttons for removing education/experience entries using FormArray.removeAt()
- **Enforce Entry Limits** - "Add" buttons disabled when maximum entries reached, delete buttons disabled when only 1 entry remains
- **Form Field Single Source of Truth** - Reordered education form fields in HTML to match form.fields.ts configuration
  - Correct field order: programName → fieldMajor → fieldMajorOther → institutionName → boardOrUniversity → institutionCountry → institutionState → institutionCity → dateFrom → dateTo
- **Centralized Model Interfaces** - Created resume.model.ts with 7 TypeScript interfaces for type safety across components
  - Interfaces: PersonalDetails, Experience, Education, Project, PersonalDetailsForm, ResumeData, LandingPageData
- **Storage Cleanup on Unmount** - ngOnDestroy lifecycle hook clears sessionStorage and localStorage when component is destroyed

**Implementation Details:**

- Updated `src/app/landing/landing.component.ts` - Added file upload handler (onFileSelected), dynamic field extraction (extractDynamicFields), replacement logic (replaceDynamicFields), storage clearing (ngOnDestroy)
- Updated `src/app/landing/landing.component.html` - Added file input element, dynamic form fields for [Placeholder] values
- Updated `src/assets/config.js` - Added maxEducations: 5 and maxExperiences: 5 configuration
- Updated `src/app/resume/form/form.component.ts` - Enforce max limits in addEducation/addExperience, load config values from appConfig, implement removeEducation/removeExperience with array validation
- Updated `src/app/resume/form/form.component.html` - Reordered education fields to match form.fields.ts, added delete buttons with appropriate disabled states
- Created `src/app/resume/resume.model.ts` - Centralized TypeScript interface definitions
- Updated `src/constants/career-objectives.ts` - Removed Skilled category

**Build Status:**

- Build successful: Hash 5ab0974a77b82539831b, Time 20213ms
- No TypeScript compilation errors
- All form operations tested and functional

---

### Version 1.3.0 - 2026-05-25 (Minor Update)

**New Features:**

- **Landing Page Component** - Professional welcome page for resume building workflow
- **Career Objective Templates** - 40+ pre-built career objectives for multiple job categories
- **Experience Type Selection** - Users choose between "Experienced Professional" or "Fresher/Graduate"
- **Professional Summary vs Career Objective** - Dynamic display based on experience level
- **Template Selection or Custom Input** - Option to use templates or write custom objectives
- **Job Category Filtering** - Career objectives filtered by job type (IT, Networking, Healthcare, Banking, Finance, Non-IT, Teaching, Non-Teaching, Graduate, Non-Graduate, Skilled, ITI, Diploma)
- **Career Objective Management** - Edit, clear, and remove options with preview
- **Form Access Control** - Resume form only accessible after completing landing page workflow

**Implementation Details:**

- Created `src/constants/career-objectives.ts` with comprehensive templates for 13 job categories
- Created `src/app/landing/landing.component.ts` with experience type and objective logic
- Created `src/app/landing/landing.component.html` with multi-step UI workflow
- Created `src/app/landing/landing.component.scss` with professional gradient styling
- Updated `src/app/app.routes.ts` to include landing page route
- Updated `src/app/app.module.ts` to declare LandingComponent
- Updated `src/app/resume/form/form.component.ts` to check for session storage data
- Updated `src/config.js` to only contain appVersion and appName
- Updated `src/app/footer/footer.component.ts` to use appVersion instead of version

**Configuration Changes:**

- Simplified `src/config.js` to contain only:
  - appVersion: '1.3.0'
  - appName: 'ResumeBuilder'

**Files Created:**

- `src/constants/career-objectives.ts` - Career objective templates (260+ lines)
- `src/app/landing/landing.component.ts` - Landing page logic
- `src/app/landing/landing.component.html` - Landing page template
- `src/app/landing/landing.component.scss` - Landing page styles

**Files Modified:**

- `src/config.js` - Simplified to minimal config
- `src/app/app.routes.ts` - Added landing page route
- `src/app/app.module.ts` - Added LandingComponent declaration
- `src/app/resume/form/form.component.ts` - Added session storage validation
- `src/app/footer/footer.component.ts` - Updated to use appVersion
- `package.json` - Updated to version 1.3.0

**User Workflow:**

1. **Landing Page** → User selects experience type
2. **If Experienced** → Enter Professional Summary
3. **If Fresher** →
   - Select template or custom input
   - Choose job category (if template)
   - Select objective or write custom
   - Manage with edit/clear/remove buttons
   - Confirm when ready
4. **Resume Form** → Data pre-populated with summary and experience type

**Verifications:**

- Build successful: Date 2026-05-25T09:28:37.195Z, Hash 78e4a2b5e3346b8e5ec9
- No TypeScript compilation errors
- Landing page routing functional
- Session storage validation working
- Career objective templates properly categorized

**Career Objective Categories Included:**

- IT (5+ objectives)
- Networking (3+ objectives)
- Healthcare (3+ objectives)
- Banking (3+ objectives)
- Finance (3+ objectives)
- Non-IT (3+ objectives)
- Teaching (3+ objectives)
- Non-Teaching (3+ objectives)
- Graduate (3+ objectives)
- Non-Graduate (3+ objectives)
- Skilled (3+ objectives)
- ITI (3+ objectives)
- Diploma (3+ objectives)

**Total Career Objectives:** 40+ templates across all categories

---

### Version 1.2.0 - 2026-05-25 (Minor Update)

**New Features:**

- **Version Configuration Migration** - Moved version management from version.constants.ts to config.js
- **Skills Summary FormArray** - Add/remove skills as bullet points on first page
- **Skills Known FormArray** - Placeholder for future skill recommendations
- **Personal Details Page** - New final page with gender, date of birth, father's name, address, declaration
- **Declaration Checkbox** - Required acceptance of resume accuracy

**Implementation Details:**

- Created `src/config.js` with window.appConfig global configuration
- Updated `src/index.html` to load config.js
- Updated footer component to read version from window.appConfig
- Added PersonalDetailsFormField with all required fields
- Added FormArray management methods for skills
- Updated form HTML with skills sections and personal details page
- Updated CustomFields interface to support boolean values

**Files Modified:**

- `src/config.js` - Created new version configuration
- `src/index.html` - Added config.js script load
- `src/app/footer/footer.component.ts` - Updated to use window.appConfig
- `src/app/resume/form/form.component.ts` - Added personal details and skills management
- `src/app/resume/form/form.component.html` - Added skills sections and personal details page
- `src/app/resume/form/form.fields.ts` - Added PersonalDetailsFormField
- `package.json` - Updated to version 1.2.0

**Removed:**

- `src/constants/version.constants.ts` - Replaced by config.js (not imported anywhere)

**Verifications:**

- Build successful: Date 2026-05-25T09:02:15.129Z, Hash c792d5cf0a86488632fb
- No TypeScript errors after CustomFields interface update
- Skills array add/remove functionality working
- Personal details page renders correctly
- Footer displays version 1.2.0

**Future Enhancements:**

- skillsKnown FormArray to be enhanced with auto-recommendations
- Postal code field to be added back for auto-population feature
- Digital signature pad for declaration signature
- PDF export with all form data

---

### Version 1.1.1 - 2026-05-25 (Patch Update)

**Bug Fixes & Improvements:**

- Removed postal code fields from education and experience forms (as per test.txt requirement #9)
- Fixed default select dropdown values to display "Please select {{fieldLabel}}" with null value (requirement #7)
- Updated text-select component for proper default placeholder handling
- Fixed duplicate "Version History" headings in README.md (requirement #6)

**Documentation Updates:**

- Created comprehensive `story.md` governance document with project constraints and requirements (requirement #4)
- Added `story.md` to `.gitignore` for sensitive project governance docs (requirement #4)
- Verified no lint errors or duplicate headings in markdown files (requirement #6)

**Files Modified:**

- `src/app/resume/form/form.fields.ts` - Removed postal code field definitions
- `src/app/resume/form/form.component.html` - Removed postal code field UI elements
- `src/app/util/text-select/text-select.component.html` - Added dynamic placeholder "Please select {{label}}"
- `story.md` - Created new governance document
- `.gitignore` - Added story.md
- `README.md` - Fixed duplicate headings and structure
- `package.json` - Updated to version 1.1.1

**Verifications:**

- Build successful: Date 2026-05-25T08:12:04.230Z
- No TypeScript compilation errors
- All test.txt requirements addressed

---

### Version 1.1.0 - 2026-05-25 (Minor Update)

**New Features:**

- Integrated **country-state-city package** for dynamic location data
- Countries, states, and cities now loaded from external library instead of static constants
- Improved location management with proper data hierarchy

**Bug Fixes:**

- **Fixed fieldMajor population**: Now properly populates specialization dropdown when programName is selected
- Fixed index-based specialization tracking for multiple education entries
- Improved form component architecture for better state management

**Enhancements:**

- LocationService created for centralized location data management
- Better separation of concerns for location handling
- Improved TypeScript typing for location objects

**Future Releases (Planned):**

- Country field with search functionality (min 3 characters input)
- State/City auto-population from postal code API
- Resume preview functionality
- Download resume as PDF
- Additional styling improvements for remaining pages
- Form validation enhancements
- Multi-language support

---

### Version 1.0.0 - 2026-05-25 (Major Release)

**Initial Stable Release**

- Dynamic resume form with multiple education and employment sections
- Expanded course specializations for Indian education system (BA, B.Sc., B.E., B.Tech., MA, M.Sc., M.Tech., M.E., PhD)
- Professional UI with Angular Material and Bootstrap
- Responsive design for all devices
- Footer with version display
- Navigation with conditional View Resume button
- Professional home page with features and how-it-works sections
- Form completion with Call-to-Action button

---

**ResumeBuilder** © 2026 | Version 1.3.0
#   R e s u m e - b u i l d e r  
 