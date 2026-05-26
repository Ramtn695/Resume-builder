import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CAREER_OBJECTIVES, CAREER_OBJECTIVE_CATEGORIES } from 'src/constants/career-objectives';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  Object = Object;

  // ── Step Navigation ───────────────────────────────────────────────
  currentStep = 1;
  readonly TOTAL_STEPS = 5;
  readonly stepLabels = ['Your Details', 'Experience Type', 'Agreement', 'Summary / Objective', 'Additional Info'];

  // ── Step 1: Your Details ──────────────────────────────────────────
  firstName = '';
  middleName = '';
  lastName = '';
  email = '';
  fieldTouched: { [key: string]: boolean } = {};

  readonly emailDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];

  get emailSuggestions(): string[] {
    const localPart = this.email.split('@')[0];
    if (!localPart.trim()) return [];
    return this.emailDomains.map(domain => `${localPart}@${domain}`);
  }

  get userDisplayName(): string {
    return [this.firstName, this.middleName, this.lastName].filter(p => p?.trim()).join(' ');
  }

  // ── Step 2: Experience Type ───────────────────────────────────────
  experienceType = '';

  // ── Step 3: Agreement ────────────────────────────────────────────
  agreeToTerms = false;

  // ── Step 4: Professional Summary (Experienced) ───────────────────
  professionalSummaryType = 'custom';   // 'custom' | 'upload' | 'ai'
  professionalSummary = '';
  professionalSummaryFile: File | null = null;
  professionalSummaryCompleted = false;

  // ── Step 4: Career Objective (Fresher) ───────────────────────────
  careerObjectiveType = 'template';     // 'template' | 'custom' | 'upload' | 'ai'
  selectedCategory = '';
  careerObjectives: string[] = [];
  selectedObjective = '';
  careerObjectiveText = '';
  careerObjectiveFile: File | null = null;
  dynamicFields: { [key: string]: string } = {};
  careerObjectiveCompleted = false;

  categories = CAREER_OBJECTIVE_CATEGORIES;

  constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  // ── Step Navigation ───────────────────────────────────────────────

  canGoNext(): boolean {
    switch (this.currentStep) {
      case 1: return this.step1Valid();
      case 2: return !!this.experienceType;
      case 3: return this.agreeToTerms;
      case 4: return this.experienceType === 'experienced'
        ? this.professionalSummaryCompleted
        : this.careerObjectiveCompleted;
      case 5: return true;
      default: return true;
    }
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      this.fieldTouched = { firstName: true, lastName: true, email: true };
    }
    if (this.canGoNext() && this.currentStep < this.TOTAL_STEPS) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) { this.currentStep--; }
  }

  // ── Validation ────────────────────────────────────────────────────

  step1Valid(): boolean {
    return !!this.firstName.trim() && !!this.lastName.trim() && this.isValidEmail(this.email);
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  touchField(field: string): void {
    this.fieldTouched[field] = true;
  }

  fieldError(field: string): boolean {
    if (!this.fieldTouched[field]) { return false; }
    switch (field) {
      case 'firstName': return !this.firstName.trim();
      case 'lastName': return !this.lastName.trim();
      default: return false;
    }
  }

  emailError(): boolean {
    return !!this.fieldTouched['email'] && !this.isValidEmail(this.email);
  }

  // ── Step 2 ────────────────────────────────────────────────────────

  onExperienceTypeChange(type: string): void {
    this.experienceType = type;
    this.agreeToTerms = false;
    this.professionalSummaryCompleted = false;
    this.careerObjectiveCompleted = false;
    this.resetSummaryFields();
  }

  // ── Step 4: Professional Summary (Experienced) ───────────────────

  onProfessionalSummaryTypeChange(type: string): void {
    this.professionalSummaryType = type;
    this.professionalSummary = '';
    this.professionalSummaryFile = null;
    this.professionalSummaryCompleted = false;
  }

  onProfessionalSummaryChange(event: any): void {
    this.professionalSummary = event.target.value;
    this.professionalSummaryCompleted = this.professionalSummary.trim().length > 0;
  }

  onSummaryFileSelected(event: any): void {
    const file = event.target.files[0];
    this.professionalSummaryFile = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.professionalSummary = e.target.result;
        this.professionalSummaryCompleted = this.professionalSummary.trim().length > 0;
      };
      reader.readAsText(file);
    }
  }

  completeProfessionalSummary(): void {
    if (this.professionalSummary.trim().length > 0) {
      this.professionalSummaryCompleted = true;
    }
  }

  // ── Step 4: Career Objective (Fresher) ───────────────────────────

  onCareerObjectiveTypeChange(type: string): void {
    this.careerObjectiveType = type;
    this.selectedCategory = '';
    this.careerObjectives = [];
    this.selectedObjective = '';
    this.careerObjectiveText = '';
    this.dynamicFields = {};
    this.careerObjectiveFile = null;
    this.careerObjectiveCompleted = false;
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.careerObjectives = (CAREER_OBJECTIVES as Record<string, string[]>)[category] || [];
    this.selectedObjective = '';
    this.careerObjectiveText = '';
    this.dynamicFields = {};
  }

  selectObjective(objective: string): void {
    this.selectedObjective = objective;
    this.careerObjectiveText = objective;
    this.extractDynamicFields(objective);
  }

  extractDynamicFields(objective: string): void {
    const fieldPattern = /\[([^\]]+)\]/g;
    let match;
    this.dynamicFields = {};
    while ((match = fieldPattern.exec(objective)) !== null) {
      if (!this.dynamicFields[match[1]]) { this.dynamicFields[match[1]] = ''; }
    }
  }

  replaceDynamicFields(): void {
    let text = this.selectedObjective;
    Object.entries(this.dynamicFields).forEach(([field, value]) => {
      text = text.replace(`[${field}]`, value || `[${field}]`);
    });
    this.careerObjectiveText = text;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.careerObjectiveFile = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.careerObjectiveText = e.target.result;
        this.careerObjectiveCompleted = this.careerObjectiveText.trim().length > 0;
      };
      reader.readAsText(file);
    }
  }

  onCustomObjectiveChange(event: any): void {
    this.careerObjectiveText = event.target.value;
  }

  clearCareerObjective(): void {
    this.careerObjectiveText = '';
    this.selectedObjective = '';
    this.careerObjectiveFile = null;
    this.dynamicFields = {};
    this.careerObjectiveCompleted = false;
    if (this.selectedCategory) {
      this.careerObjectives = (CAREER_OBJECTIVES as Record<string, string[]>)[this.selectedCategory] || [];
    }
  }

  completeCareerObjective(): void {
    if (this.careerObjectiveText.trim().length > 0) {
      this.careerObjectiveCompleted = true;
    }
  }

  // ── Final: Create Resume ──────────────────────────────────────────

  canProceed(): boolean {
    return this.step1Valid() && !!this.experienceType && this.agreeToTerms &&
      (this.experienceType === 'experienced' ? this.professionalSummaryCompleted : this.careerObjectiveCompleted);
  }

  proceedToForm(): void {
    const summaryData = {
      experienceType: this.experienceType,
      summary: this.experienceType === 'experienced' ? this.professionalSummary : this.careerObjectiveText,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      fullName: this.userDisplayName,
      email: this.email,
      isTermsAgreed:this.agreeToTerms
    };
    sessionStorage.setItem('resumeSummary', JSON.stringify(summaryData));
    sessionStorage.setItem('experienceType', this.experienceType);
    this.router.navigate(['/resume/form']);
  }

  private resetSummaryFields(): void {
    this.professionalSummary = '';
    this.professionalSummaryType = 'custom';
    this.professionalSummaryFile = null;
    this.careerObjectiveType = 'template';
    this.selectedCategory = '';
    this.careerObjectives = [];
    this.selectedObjective = '';
    this.careerObjectiveText = '';
    this.careerObjectiveFile = null;
    this.dynamicFields = {};
  }

}
