import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import {
  CATEGORY,
  PROGRAM_NAME,
  SPECIALIZATION_MAP
} from 'src/constants/resume.constants';
import { GENDER_OPTIONS, DECLARATION_FORMATS } from '../constants/app.constants';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';
import { FormUtils } from './form.utils';
import { EducationFormField, ExperienceFormField, ProjectFormField, PersonalDetailsFormField } from './form.fields';
import { LocationService } from '../services/location.service';
import { EducationService } from '../services/education.service';

const MONTH_YEAR_FORMATS = {
  parse: { dateInput: null },
  display: {
    dateInput: { month: 'short', year: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MONTH_YEAR_FORMATS }]
})
export class FormComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('stepper2') innerExperienceStepper!: MatStepper;
  @ViewChild('stepper3') innerEducationStepper!: MatStepper;
  formStepIndex = 0;
  maxReachedStep = 0;
  isLoading = true;
  showExperienceSummary = false;
  showEducationSummary = false;

  professionalForm!: FormGroup;
  experienceForm!: FormGroup;
  educationForm!: FormGroup;
  projectForm!: FormGroup;
  otherDetails!: FormGroup;
  personalDetailsForm!: FormGroup;

  resumeDetails: any

  expOrFresher = CATEGORY;
  programNames = PROGRAM_NAME;
  countries: any[] = [];
  countryNames: string[] = [];
  states: any[] = [];
  stateNames: string[] = [];
  cities: any[] = [];
  // Per-entry location maps (avoid sharing state/city data across entries)
  educationStates: { [key: number]: string[] } = {};
  educationCities: { [key: number]: string[] } = {};
  experienceStates: { [key: number]: string[] } = {};
  experienceCities: { [key: number]: string[] } = {};
  specializations: string[] = [];
  isExperienced = true;
  educationSpecializations: { [key: number]: string[] } = {};
  genderOptions = GENDER_OPTIONS;
  declarationFormats = DECLARATION_FORMATS;
  selectedDeclaration = DECLARATION_FORMATS[0];
  declarationMode: 'format' | 'custom' = 'format';
  customDeclarationText = '';
  specializationMap = SPECIALIZATION_MAP;

  readonly WORLD_LANGUAGES: string[] = [
    'Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Assamese', 'Azerbaijani', 'Basque',
    'Belarusian', 'Bengali', 'Bhojpuri', 'Bosnian', 'Bulgarian', 'Catalan',
    'Chinese (Cantonese)', 'Chinese (Mandarin)', 'Croatian', 'Czech', 'Danish', 'Dari',
    'Dutch', 'English', 'Estonian', 'Finnish', 'French', 'Galician', 'Georgian',
    'German', 'Greek', 'Gujarati', 'Hausa', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic',
    'Igbo', 'Indonesian', 'Irish', 'Italian', 'Japanese', 'Javanese', 'Kannada',
    'Kazakh', 'Khmer', 'Korean', 'Kurdish', 'Kyrgyz', 'Lao', 'Latvian', 'Lithuanian',
    'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Marathi', 'Mongolian',
    'Nepali', 'Norwegian', 'Odia', 'Pashto', 'Persian/Farsi', 'Polish', 'Portuguese',
    'Punjabi', 'Romanian', 'Russian', 'Sanskrit', 'Serbian', 'Sinhalese', 'Slovak',
    'Slovenian', 'Somali', 'Spanish', 'Swahili', 'Swedish', 'Tagalog/Filipino', 'Tajik',
    'Tamil', 'Telugu', 'Thai', 'Turkish', 'Turkmen', 'Ukrainian', 'Urdu', 'Uzbek',
    'Vietnamese', 'Welsh', 'Xhosa', 'Yoruba', 'Zulu'
  ];

  // Configuration from config.js
  maxEducations: number = (window as any).appConfig?.maxEducations || 5;
  maxExperiences: number = (window as any).appConfig?.maxExperiences || 5;
  educationPreferredCountry = '';

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private route: Router,
    private formUtilService: FormUtils,
    private locationService: LocationService,
    private educationService: EducationService
  ) { }

  ngOnInit(): void {
    // Check if user has completed landing page
    const summaryData = sessionStorage.getItem('resumeSummary');
    if (!summaryData) {
      this.route.navigate(['/landing']);
      return;
    }

    let parsedSummary: any;
    try {
      parsedSummary = JSON.parse(summaryData);
    } catch {
      this.route.navigate(['/landing']);
      return;
    }
    const { experienceType, summary, firstName, middleName, lastName, email } = parsedSummary;

    // Set isExperienced based on user type
    this.isExperienced = experienceType === 'experienced';

    // Load education preferences from landing step 5
    const eduPrefsData = sessionStorage.getItem('educationPreferences');
    if (eduPrefsData) {
      try {
        const eduPrefs = JSON.parse(eduPrefsData);
        this.educationPreferredCountry = eduPrefs.preferredCountry || '';
      } catch { }
    }

    // Defer form initialization so spinner renders on first change-detection cycle
    setTimeout(() => {
      this.initializeLocations();
      this.professionalForm = this.fb.group({
        firstName: [firstName || '', [Validators.required, Validators.minLength(3)]],
        middleName: [middleName || ''],
        lastName: [lastName || '', Validators.required],
        jobTitle: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(`^[6-9][0-9]{9}$`)],
        ],
        email: [email || '', [Validators.required, Validators.email]],
        summary: [summary, Validators.required],
        expOrFresher: [experienceType, Validators.required],
        skillsSummary: this.fb.array([]),
        skillsKnown: this.fb.array([])
      });
      this.initializeForms();
      this.initializePersonalDetailsForm();

      // Pre-populate address fields from landing location
      const locationData = sessionStorage.getItem('landingLocation');
      if (locationData) {
        try {
          const loc = JSON.parse(locationData);
          if (loc.city) this.personalDetailsForm.get('city')?.setValue(loc.city);
          if (loc.state) this.personalDetailsForm.get('state')?.setValue(loc.state);
          if (loc.country) this.personalDetailsForm.get('country')?.setValue(loc.country);
          if (loc.postalCode) this.personalDetailsForm.get('postalCode')?.setValue(loc.postalCode);
        } catch { }
      }
      this.isLoading = false;
    }, 0);
  }


  initializeLocations(): void {
    this.countries = this.locationService.getCountries();
    this.countryNames = this.countries.map(c => c.name);
  }

  onCountryChange(selectedCountry: string, index?: number): void {
    const countryCode = this.locationService.getCountryCode(selectedCountry);
    this.states = this.locationService.getStates(countryCode);
    this.stateNames = this.states.map(s => s.name);
    this.cities = [];
  }

  onStateChange(selectedCountry: string, selectedState: string): void {
    const countryCode = this.locationService.getCountryCode(selectedCountry);
    this.cities = this.locationService.getCities(countryCode, selectedState);
  }

  initializeForms(): void {
    const experienceGroup = this.formUtilService.createFormGroups(ExperienceFormField, this.fb);
    const educationGroup = this.formUtilService.createFormGroups(EducationFormField, this.fb);
    educationGroup.addControl('achievements', this.fb.array([]));
    const projectGroup = this.formUtilService.createFormGroups(ProjectFormField, this.fb);

    // Pre-populate institutionCountry for the first education entry from landing preference
    if (this.educationPreferredCountry) {
      educationGroup.patchValue({ institutionCountry: this.educationPreferredCountry });
      const countryCode = this.locationService.getCountryCode(this.educationPreferredCountry);
      this.educationStates[0] = this.locationService.getStates(countryCode).map(s => s.name);
    }

    this.experienceForm = this.fb.group({
      experiences: this.fb.array([experienceGroup])
    });
    this.projectForm = this.fb.group({
      projects: this.fb.array([projectGroup])
    });
    this.educationForm = this.fb.group({
      educations: this.fb.array([educationGroup])
    });
  }

  onSubmit(): void {
    if (this.professionalForm.valid) {
      if (this.professionalForm.value['expOrFresher'] === 'Fresher') {
        this.isExperienced = !this.isExperienced;
      }
      this.createResume();
    }
  }

  //creates and sets to session/local storage future can handle by API and do auto delete after
  //sending email at 24 hours
  createResume():void {
    this.resumeDetails = {
      professionalDetails: this.professionalForm.value,
      educationDetails: this.educationForm.value,
      experienceDetails: this.experienceForm.getRawValue(),
      projectDetails: this.projectForm.value,
      personalDetails: { ...this.personalDetailsForm.value, declarationText: this.selectedDeclaration },
      summaryData: JSON.parse(sessionStorage.getItem('resumeSummary') || 'null')
    }
    this.resumeService.createResume(this.resumeDetails);
    console.log(this.resumeService.getResume());
  }

  addEducation(): void {
    const educationArray = this.educationForm.get('educations') as FormArray;
    if (educationArray.length < this.maxEducations) {
      const newIndex = educationArray.length;
      const educationGroup = this.formUtilService.createFormGroups(EducationFormField, this.fb);
      educationGroup.addControl('achievements', this.fb.array([]));
      // Pre-populate institutionCountry from education preference for every new entry
      if (this.educationPreferredCountry) {
        educationGroup.patchValue({ institutionCountry: this.educationPreferredCountry });
        const countryCode = this.locationService.getCountryCode(this.educationPreferredCountry);
        this.educationStates[newIndex] = this.locationService.getStates(countryCode).map(s => s.name);
      }
      educationArray.push(educationGroup);
      this.educationForm = this.fb.group({
        educations: educationArray
      });
    }
  }

  removeEducation(index: number): void {
    const educationArray = this.educationForm.get('educations') as FormArray;
    if (educationArray.length > 1) {
      educationArray.removeAt(index);
      // Reset educationSpecializations for removed index
      delete this.educationSpecializations[index];
      this.educationForm = this.fb.group({
        educations: educationArray
      });
    }
  }

  addExperience(): void {
    const experienceArray = this.experienceForm.get('experiences') as FormArray;
    if (experienceArray.length < this.maxExperiences) {
      const experienceGroup = this.formUtilService.createFormGroups(ExperienceFormField, this.fb);
      experienceArray.push(experienceGroup);
      this.experienceForm = this.fb.group({
        experiences: experienceArray
      });
    }
  }

  removeExperience(index: number): void {
    const experienceArray = this.experienceForm.get('experiences') as FormArray;
    if (experienceArray.length > 1) {
      experienceArray.removeAt(index);
      this.experienceForm = this.fb.group({
        experiences: experienceArray
      });
    }
  }

  onExperienceSubmit(stepper: MatStepper): void {
    if (this.experienceForm.valid) {
      this.createResume();
      stepper.next();
    }
  }

  onEducationSubmit(stepper: MatStepper): void {
    if (this.educationForm.valid) {
      this.createResume();
      stepper.next();
    }
  }

  // Update specializations based on selected program/course
  onProgramChange(programName: string, index: number): void {
    const specMap = SPECIALIZATION_MAP as Record<string, string[]>;
    if (specMap[programName]) {
      this.educationSpecializations[index] = specMap[programName];
      // Clear fieldMajor when program changes
      const educationArray = this.educationForm.get('educations') as FormArray;
      if (educationArray.at(index)) {
        educationArray.at(index).get('fieldMajor')?.setValue('');
      }
    } else {
      this.educationSpecializations[index] = [];
    }
  }

  // Get specializations for a specific education entry
  getSpecializations(index: number): string[] {
    return this.educationSpecializations[index] || [];
  }

  // Check if "Other" is selected for fieldMajor to show custom input
  isFieldMajorOtherSelected(fieldMajor: string): boolean {
    return fieldMajor === 'Others';
  }

  // Initialize Personal Details Form
  initializePersonalDetailsForm(): void {
    const personalDetailsGroup = this.formUtilService.createFormGroups(PersonalDetailsFormField, this.fb);
    this.personalDetailsForm = this.fb.group({
      ...personalDetailsGroup.controls,
      languages: this.fb.array([this.fb.control('English')])
    });
  }

  // Add skill to Skills Summary
  addSkillSummary(): void {
    const skillsArray = this.professionalForm.get('skillsSummary') as FormArray;
    skillsArray.push(this.fb.control('', Validators.required));
  }

  // Remove skill from Skills Summary
  removeSkillSummary(index: number): void {
    const skillsArray = this.professionalForm.get('skillsSummary') as FormArray;
    skillsArray.removeAt(index);
  }

  // Add skill to Skills Known
  addSkillKnown(): void {
    const skillsArray = this.professionalForm.get('skillsKnown') as FormArray;
    skillsArray.push(this.fb.control('', Validators.required));
  }

  // Remove skill from Skills Known
  removeSkillKnown(index: number): void {
    const skillsArray = this.professionalForm.get('skillsKnown') as FormArray;
    skillsArray.removeAt(index);
  }

  // Get Skills Summary array
  getSkillsSummary(): FormArray {
    return this.professionalForm.get('skillsSummary') as FormArray;
  }

  // Get Skills Known array
  getSkillsKnown(): FormArray {
    return this.professionalForm.get('skillsKnown') as FormArray;
  }

  // ============== LANGUAGES ==============

  getLanguages(): FormArray {
    return this.personalDetailsForm.get('languages') as FormArray;
  }

  addLanguageFromSelect(selectEl: HTMLSelectElement): void {
    const lang = selectEl.value;
    if (lang && !this.getLanguages().controls.some(c => c.value === lang)) {
      this.getLanguages().push(this.fb.control(lang));
    }
    selectEl.value = '';
  }

  removeLanguage(index: number): void {
    this.getLanguages().removeAt(index);
  }

  // ============== DECLARATION ==============

  switchToFormatDeclaration(): void {
    this.declarationMode = 'format';
    this.selectedDeclaration = this.declarationFormats[0];
  }

  switchToCustomDeclaration(): void {
    this.declarationMode = 'custom';
    this.selectedDeclaration = this.customDeclarationText;
  }

  onCustomDeclarationInput(event: Event): void {
    this.customDeclarationText = (event.target as HTMLTextAreaElement).value;
    this.selectedDeclaration = this.customDeclarationText;
  }

  // ============== DYNAMIC FORM METHODS ==============

  /**
   * Get education field configuration (form.fields.ts)
   */
  getEducationFields(): any[] {
    return EducationFormField;
  }

  /**
   * Get experience field configuration (form.fields.ts)
   */
  getExperienceFields(): any[] {
    return ExperienceFormField;
  }

  /**
   * Get project field configuration (form.fields.ts)
   */
  getProjectFields(): any[] {
    return ProjectFormField;
  }

  /**
   * Get values for a specific field based on valuesSource
   * Returns array of values for select dropdowns
   * Uses per-entry location maps to avoid data sharing across multiple entries
   */
  getFieldValues(field: any, formGroup: FormGroup, index?: number): any[] {
    const { valuesSource, staticValues, id } = field;

    if (valuesSource === "courseNames") {
      const country = formGroup.get('institutionCountry')?.value || '';
      const effectiveCountry = country || (index === 0 ? this.educationPreferredCountry : '');
      return this.educationService.getEducationLevelBasedOnCountry(effectiveCountry);
    }

    if (valuesSource === 'static' && staticValues) {
      return staticValues;
    }

    if (valuesSource === 'program') {
      const country = formGroup.get('institutionCountry')?.value || '';
      const courseVal = formGroup.get('courseName')?.value;
      return this.educationService.getFieldMajorOptions(country, courseVal);
    }

    if (valuesSource === 'specialization' && index !== undefined) {
      return this.getSpecializations(index);
    }

    if (valuesSource === 'country') {
      return this.countryNames;
    }

    if (valuesSource === 'state') {
      if (index !== undefined) {
        if (id && id.startsWith('institution')) return this.educationStates[index] || [];
        if (id && id.startsWith('company')) return this.experienceStates[index] || [];
      }
      return this.stateNames;
    }

    if (valuesSource === 'city') {
      if (index !== undefined) {
        if (id && id.startsWith('institution')) return this.educationCities[index] || [];
        if (id && id.startsWith('company')) return this.experienceCities[index] || [];
      }
      return this.cities;
    }

    return [];
  }

  /**
   * Check if field should be displayed based on dependencies
   * Returns false if dependent field is empty
   * Handles string, array, and null values safely
   */
  shouldShowField(field: any, formGroup: FormGroup): boolean {
    // Conditional-only fields are shown via their parent field's otherField mechanism
    if (field.conditional) return false;

    if (!field.dependsOn) return true;

    const val = formGroup.get(field.dependsOn)?.value;
    if (val == null) return false;
    const strVal = Array.isArray(val) ? (val[0] || '') : String(val);
    if (!strVal.trim() || strVal === 'null') return false;

    // For program field: only show when the selected course level has sub-programs via education service
    if (field.valuesSource === 'program') {
      const country = formGroup.get('institutionCountry')?.value || '';
      return this.educationService.getFieldMajorOptions(country, strVal).length > 0;
    }

    // For specialization field: only show when the selected program has known specializations
    if (field.valuesSource === 'specialization') {
      const specMap = SPECIALIZATION_MAP as Record<string, string[]>;
      return !!specMap[strVal] && specMap[strVal].length > 0;
    }

    return true;
  }

  /**
   * Handle field value changes for dynamic updates
   * Triggers cascade updates for program->specialization and country->state->city
   * Uses per-entry location maps so multiple entries don't share data
   */
  onDynamicFieldChange(fieldId: string, rawValue: any, formGroup: FormGroup, index?: number): void {
    // Normalize value - handle array from setSelected or plain string
    const value = Array.isArray(rawValue) ? (rawValue[0] || '') : String(rawValue || '');

    // Course name change - reset program and specialization
    if (fieldId === 'courseName') {
      formGroup.get('programName')?.setValue('');
      formGroup.get('fieldMajor')?.setValue('');
      formGroup.get('fieldMajorOther')?.setValue('');
      formGroup.get('courseNameOther')?.setValue('');
      if (index !== undefined) this.educationSpecializations[index] = [];
    }

    // Program change - update specializations for this education entry
    if (fieldId === 'programName' && index !== undefined) {
      this.onProgramChange(value, index);
      formGroup.get('fieldMajor')?.setValue('');
      formGroup.get('fieldMajorOther')?.setValue('');
      formGroup.get('programNameOther')?.setValue('');
    }

    // Institution Country change - update per-entry states
    if (fieldId === 'institutionCountry') {
      const countryCode = this.locationService.getCountryCode(value);
      const states = this.locationService.getStates(countryCode);
      const stateNames = states.map(s => s.name);
      if (index !== undefined) {
        this.educationStates[index] = stateNames;
        this.educationCities[index] = [];
      }
      formGroup.get('institutionState')?.setValue('');
      formGroup.get('institutionCity')?.setValue('');
    }

    // Company Country change - update per-entry states
    if (fieldId === 'companyCountry') {
      const countryCode = this.locationService.getCountryCode(value);
      const states = this.locationService.getStates(countryCode);
      const stateNames = states.map(s => s.name);
      if (index !== undefined) {
        this.experienceStates[index] = stateNames;
        this.experienceCities[index] = [];
      }
      formGroup.get('companyState')?.setValue('');
      formGroup.get('companyCity')?.setValue('');
    }

    // Institution State change - update per-entry cities
    if (fieldId === 'institutionState') {
      const countryValue = formGroup.get('institutionCountry')?.value || '';
      const countryCode = this.locationService.getCountryCode(countryValue);
      const stateCode = this.locationService.getStateCode(countryCode, value);
      const cities = this.locationService.getCities(countryCode, stateCode);
      if (index !== undefined) {
        this.educationCities[index] = cities;
      }
      formGroup.get('institutionCity')?.setValue('');
    }

    // Company State change - update per-entry cities
    if (fieldId === 'companyState') {
      const countryValue = formGroup.get('companyCountry')?.value || '';
      const countryCode = this.locationService.getCountryCode(countryValue);
      const stateCode = this.locationService.getStateCode(countryCode, value);
      const cities = this.locationService.getCities(countryCode, stateCode);
      if (index !== undefined) {
        this.experienceCities[index] = cities;
      }
      formGroup.get('companyCity')?.setValue('');
    }
  }

  /**
   * Check if "Other" field should be displayed
   * Used for fieldMajor -> fieldMajorOther conditional display
   */
  isOtherFieldSelected(fieldValue: string): boolean {
    return !!fieldValue && fieldValue.toLowerCase().startsWith('other');
  }

  /**
   * Get display label for a field
   * Falls back to formatted id if label not provided
   */
  getFieldLabel(field: any): string {
    if (field.label) {
      return field.label;
    }

    // Convert camelCase to Title Case
    return field.id
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str: string) => str.toUpperCase())
      .trim();
  }

  getProgram(field: any, formGroup: FormGroup, index?: number): string[] {
    const country = formGroup.get('institutionCountry')?.value || '';
    const courseVal = formGroup.get('courseName')?.value;
    if (!courseVal) return [];
    return this.educationService.getFieldMajorOptions(country, courseVal);
  }

  getVisibleFormSteps(): string[] {
    const steps = ['Professional Details'];
    if (this.isExperienced) steps.push('Experience Details');
    steps.push('Education Details', 'Personal Details', 'Done');
    return steps;
  }

  goToStep(index: number): void {
    if (this.stepper && index <= this.maxReachedStep) {
      this.stepper.selectedIndex = index;
    }
  }

  onStepChange(event: any): void {
    this.formStepIndex = event.selectedIndex;
    if (event.selectedIndex > this.maxReachedStep) {
      this.maxReachedStep = event.selectedIndex;
    }
  }

  selectMonthYear(normalizedDate: Date, datepicker: any, ctrl: AbstractControl | null): void {
    if (!ctrl) return;
    const d = new Date(normalizedDate);
    d.setDate(1);
    ctrl.setValue(d);
    datepicker.close();
  }

  onCurrentlyWorkingChange(formGroup: FormGroup, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      formGroup.get('dateTo')?.disable();
      formGroup.get('dateTo')?.setValue(null);
    } else {
      formGroup.get('dateTo')?.enable();
    }
  }

  onExperienceNext(outerStepper: MatStepper, innerStepper: MatStepper, index: number, formGroup: FormGroup): void {
    this.markAllTouched(formGroup);
    if (!formGroup.valid) return;
    const total = (this.experienceForm.get('experiences') as FormArray).length;
    if (index === total - 1) {
      this.showExperienceSummary = true;
    } else {
      innerStepper.next();
    }
  }

  onEducationNext(outerStepper: MatStepper, innerStepper: MatStepper, index: number, formGroup: FormGroup): void {
    this.markAllTouched(formGroup);
    if (!formGroup.valid) return;
    const total = (this.educationForm.get('educations') as FormArray).length;
    if (index === total - 1) {
      this.showEducationSummary = true;
    } else {
      innerStepper.next();
    }
  }

  markAllTouched(formGroup: FormGroup): void {
    formGroup.markAllAsTouched();
  }

  acceptExperienceSummary(outerStepper: MatStepper): void {
    this.showExperienceSummary = false;
    this.onExperienceSubmit(outerStepper);
  }

  acceptEducationSummary(outerStepper: MatStepper): void {
    this.showEducationSummary = false;
    this.onEducationSubmit(outerStepper);
  }

  editExperience(index: number): void {
    this.showExperienceSummary = false;
    setTimeout(() => {
      if (this.innerExperienceStepper) {
        this.innerExperienceStepper.selectedIndex = index;
      }
    });
  }

  editEducation(index: number): void {
    this.showEducationSummary = false;
    setTimeout(() => {
      if (this.innerEducationStepper) {
        this.innerEducationStepper.selectedIndex = index;
      }
    });
  }

  getExperienceEntries(): AbstractControl[] {
    return (this.experienceForm.get('experiences') as FormArray).controls;
  }

  getEducationEntries(): AbstractControl[] {
    return (this.educationForm.get('educations') as FormArray).controls;
  }

  getEntryValue(entry: AbstractControl, key: string): any {
    return entry.get(key)?.value;
  }

  getAchievements(educationIndex: number): FormArray {
    return (this.educationForm.get('educations') as FormArray).at(educationIndex).get('achievements') as FormArray;
  }

  addAchievement(educationIndex: number): void {
    this.getAchievements(educationIndex).push(this.fb.control(''));
  }

  removeAchievement(educationIndex: number, achIndex: number): void {
    this.getAchievements(educationIndex).removeAt(achIndex);
  }

  onDestroy() {
    localStorage.clear();
    sessionStorage.clear();
  }

}

