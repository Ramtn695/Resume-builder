import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ResumeService from '../resume.service';
import {
  CATEGORY,
  PROGRAM_NAME,
  SPECIALIZATION_MAP,
  ALL_PROGRAMS,
  PROGRAMS_BY_LEVEL
} from 'src/constants/resume.constants';
import { MatStepper } from '@angular/material/stepper';
import { FormUtils } from './form.utils';
import { EducationFormField, ExperienceFormField, ProjectFormField, PersonalDetailsFormField } from './form.fields';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
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
  genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  declarationValues = ['I hereby declare that the information provided in this resume is true and accurate to the best of my knowledge.'];
  specializationMap = SPECIALIZATION_MAP;

  // Configuration from config.js
  maxEducations: number = (window as any).appConfig?.maxEducations || 5;
  maxExperiences: number = (window as any).appConfig?.maxExperiences || 5;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private route: Router,
    private formUtilService: FormUtils,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    // Check if user has completed landing page
    const summaryData = sessionStorage.getItem('resumeSummary');
    if (!summaryData) {
      this.route.navigate(['/landing']);
      return;
    }

    const { experienceType, summary, firstName, middleName, lastName, email } = JSON.parse(summaryData);

    // Set isExperienced based on user type
    this.isExperienced = experienceType === 'experienced';


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
    const projectGroup = this.formUtilService.createFormGroups(ProjectFormField, this.fb);
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
      experienceDetails: this.experienceForm.value,
      projectDetails: this.projectForm.value,
      personalDetails: this.professionalForm.value,
      summaryData: JSON.parse((sessionStorage.getItem('summaryData')) as string)
    }
    this.resumeService.createResume(this.resumeDetails);
    console.log(this.resumeService.getResume());
  }

  addEducation(): void {
    const educationArray = this.educationForm.get('educations') as FormArray;
    if (educationArray.length < this.maxEducations) {
      const educationGroup = this.formUtilService.createFormGroups(EducationFormField, this.fb);
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
      ...personalDetailsGroup.controls
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
      return this.programNames
    }

    if (valuesSource === 'static' && staticValues) {
      return staticValues;
    }

    if (valuesSource === 'program') {
      return this.getProgram(field, formGroup, index);
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

    // For program field: only show when the selected course level has sub-programs
    if (field.valuesSource === 'program') {
      return strVal in (PROGRAMS_BY_LEVEL as Record<string, string[]>);
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
      if (index !== undefined) this.educationSpecializations[index] = [];
    }

    // Program change - update specializations for this education entry
    if (fieldId === 'programName' && index !== undefined) {
      this.onProgramChange(value, index);
      formGroup.get('fieldMajor')?.setValue('');
      formGroup.get('fieldMajorOther')?.setValue('');
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
    const courseVal = formGroup.get('courseName')?.value;
    if (!courseVal) return [];
    const levelMap = PROGRAMS_BY_LEVEL[courseVal];
    return levelMap ? levelMap : [];
  }

  markAllTouched(formGroup: FormGroup): void {
    formGroup.markAllAsTouched();
  }

  onDestroy() {
    localStorage.clear();
    sessionStorage.clear();
  }

}

