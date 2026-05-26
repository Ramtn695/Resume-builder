import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

/**
 * Field Configuration Format:
 * - id: Field identifier (used as FormControl name)
 * - fieldType: 'text' | 'select' | 'date' | 'textarea'
 * - initialValue: Default value for FormControl
 * - validators: Angular validators
 * - label: Display label (optional, generated from id if not provided)
 * - valuesSource: 'static' | 'program' | 'country' | 'state' (determines how values are fetched)
 * - dependsOn: Field that must be filled first (for progressive disclosure)
 * - otherField: Corresponding 'Other' field name (for conditional "Other" input)
 */

export const ExperienceFormField = [
  {
    id: 'companyName',
    fieldType: 'text',
    initialValue: '',
    validators: Validators.required,
    label: 'Company Name',
  },
  {
    id: 'designation',
    fieldType: 'text',
    initialValue: '',
    validators: Validators.required,
    label: 'Designation',
  },
  {
    id: 'companyCountry',
    fieldType: 'select',
    initialValue: '',
    validators: null,
    label: 'Country',
    valuesSource: 'country',
  },
  {
    id: 'companyState',
    fieldType: 'select',
    initialValue: '',
    validators: null,
    label: 'State',
    valuesSource: 'state',
    dependsOn: 'companyCountry',
  },
  {
    id: 'companyCity',
    fieldType: 'select',
    initialValue: '',
    validators: null,
    label: 'City',
    valuesSource: 'city',
    dependsOn: 'companyState',
  },
  {
    id: 'dateFrom',
    fieldType: 'date',
    initialValue: '',
    validators: Validators.required,
    label: 'From Date',
  },
  {
    id: 'dateTo',
    fieldType: 'date',
    initialValue: '',
    validators: Validators.required,
    label: 'To Date',
  },
  {
    id: 'responsibilities',
    fieldType: 'textarea',
    initialValue: '',
    validators: Validators.required,
    label: 'Responsibilities',
  },
];

export const EducationFormField = [
   {
    id: 'institutionCountry',
    fieldType: 'select',
    initialValue: '',
    validators: Validators.required,
    label: 'Country',
    valuesSource: 'country',
  },
  {
    id: 'courseName',
    fieldType: 'select',
    initialValue: '',
    validators: Validators.required,
    label: 'Course Name',
    valuesSource: 'courseNames',
    otherField: 'courseNameOther',
  },
  {
    id: 'courseNameOther',
    fieldType: 'text',
    initialValue: '',
    validators: null,
    label: 'Specify Education Level',
    conditional: true,
  },
  {
    id: 'programName',
    fieldType: 'select',
    initialValue: '',
    validators: null,
    dependsOn: 'courseName',
    label: 'Program Name',
    valuesSource: 'program',
    otherField: 'programNameOther',
  },
  {
    id: 'programNameOther',
    fieldType: 'text',
    initialValue: '',
    validators: null,
    label: 'Specify Program Name',
    conditional: true,
  },
  {
    id: 'fieldMajor',
    fieldType: 'select',
    initialValue: '',
    validators: null,
    label: 'Field/Major',
    valuesSource: 'specialization',
    dependsOn: 'programName',
    otherField: 'fieldMajorOther',
  },
  {
    id: 'fieldMajorOther',
    fieldType: 'text',
    initialValue: '',
    validators: null,
    label: 'Specify Field/Major',
    conditional: true,
  },
  {
    id: 'percentage',
    fieldType: 'text',
    initialValue: '',
    validators: Validators.required,
    label: 'CGPA / Percentage'
  },
  {
    id: 'institutionName',
    fieldType: 'text',
    initialValue: '',
    validators: Validators.required,
    label: 'Institution Name',
  },
  {
    id: 'boardOrUniversity',
    fieldType: 'text',
    initialValue: '',
    validators: Validators.required,
    label: 'Board/University',
  },
  {
    id: 'institutionState',
    fieldType: 'select',
    initialValue: '',
    validators: Validators.required,
    label: 'State',
    valuesSource: 'state',
    dependsOn: 'institutionCountry',
  },
  {
    id: 'institutionCity',
    fieldType: 'select',
    initialValue: '',
    validators: Validators.required,
    label: 'City',
    valuesSource: 'city',
    dependsOn: 'institutionState',
  },
  {
    id: 'dateFrom',
    fieldType: 'date',
    initialValue: '',
    validators: Validators.required,
    label: 'From Date',
  },
  {
    id: 'dateTo',
    fieldType: 'date',
    initialValue: '',
    validators: Validators.required,
    label: 'To Date',
  },
];

export const ProjectFormField = [
  {
    id: 'projectName',
    fieldType: 'text',
    initialValue: '',
    validators: Validators.required,
    label: 'Project Name',
  },
  {
    id: 'skillsUsed',
    fieldType: 'text',
    initialValue: '',
    validators: Validators.required,
    label: 'Skills Used',
  },
  {
    id: 'dateFrom',
    fieldType: 'date',
    initialValue: '',
    validators: Validators.required,
    label: 'From Date',
  },
  {
    id: 'dateTo',
    fieldType: 'date',
    initialValue: '',
    validators: Validators.required,
    label: 'To Date',
  },
  {
    id: 'responsibilities',
    fieldType: 'textarea',
    initialValue: '',
    validators: Validators.required,
    label: 'Responsibilities',
  },
  {
    id: 'role',
    fieldType: 'text',
    initialValue: '',
    validators: null,
    label: 'Role',
  },
];

export const PersonalDetailsFormField = [
  {
    id: 'gender',
    fieldType: 'select',
    initialValue: '',
    validators: Validators.required,
    label: 'Gender',
    valuesSource: 'static',
    staticValues: ['Male', 'Female', 'Other', 'Prefer not to say'],
  },
  {
    id: 'dateOfBirth',
    fieldType: 'date',
    initialValue: '',
    validators: Validators.required,
    label: 'Date of Birth',
  },
  {
    id: 'fathersName',
    fieldType: 'text',
    initialValue: '',
    validators: Validators.required,
    label: "Father's Name",
  },
  {
    id: 'address',
    fieldType: 'textarea',
    initialValue: '',
    validators: Validators.required,
    label: 'Address',
  },
  {
    id: 'declaration',
    fieldType: 'checkbox',
    initialValue: false,
    validators: Validators.requiredTrue,
    label: 'I declare that all information provided is accurate',
  },
];

export interface CustomFields{
    id: string;
    initialValue: string | boolean;
    validators: ((control: AbstractControl) => ValidationErrors | null) | null;
}