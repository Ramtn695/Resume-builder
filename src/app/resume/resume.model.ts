/**
 * Resume Data Models - Centralized interface for all resume data structures
 * Prevents duplicates and ensures consistency across the application
 */

export interface PersonalDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  jobTitle: string;
  phoneNumber: string;
  email: string;
  address: string;
  summary: string;
  expOrFresher: string; // 'experienced' or 'fresher'
}

export interface Experience {
  companyName: string;
  companyCountry: string;
  companyState: string;
  companyCity: string;
  dateFrom: string;
  dateTo: string;
  designation: string;
  responsibilities: string;
}

export interface Education {
  programName: string;
  fieldMajor: string;
  fieldMajorOther?: string;
  institutionName: string;
  boardOrUniversity: string;
  institutionCountry: string;
  institutionState: string;
  institutionCity: string;
  dateFrom: string;
  dateTo: string;
}

export interface Project {
  projectName: string;
  skillsUsed: string;
  dateFrom: string;
  dateTo: string;
  responsibilities: string;
  role?: string;
}

export interface PersonalDetailsForm {
  gender: string;
  dateOfBirth: string;
  fathersName: string;
  address: string;
  declaration: boolean;
}

export interface CustomFields {
  id: string;
  initialValue: string | boolean;
  validators: any;
  type?: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  skillsSummary: string[];
  skillsKnown: string[];
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  personalDetails_Form: PersonalDetailsForm;
}

export interface LandingPageData {
  experienceType: 'experienced' | 'fresher';
  summary: string;
  careerObjective?: string;
  professionalSummary?: string;
  agreeToTerms: boolean;
}
