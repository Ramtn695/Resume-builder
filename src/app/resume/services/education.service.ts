import { Injectable } from '@angular/core';
import { GLOBAL_EDUCATION_REGISTRY, PROGRAMS_BY_LEVEL } from '../constants/education.constants';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor() { }

  getEducationLevelBasedOnCountry(country: string): string[] {
    return GLOBAL_EDUCATION_REGISTRY.find(e => e.country === country)
    ? GLOBAL_EDUCATION_REGISTRY.find(e => e.country === country)?.levels || []
    : GLOBAL_EDUCATION_REGISTRY.find(e => e.isoCode === 'DEFAULT')?.levels || [];
  }

  getEducationCountries(): { name: string; isoCode: string }[] {
    return GLOBAL_EDUCATION_REGISTRY
      .filter(e => e.isoCode !== 'DEFAULT')
      .map(e => ({ name: e.country, isoCode: e.isoCode }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  getFieldMajorOptions(country: string, educationLevel: string): string[] {
    const countryEntry = GLOBAL_EDUCATION_REGISTRY.find(e => e.country === country);
    if (countryEntry) {
      const levelEntry = countryEntry.normalizer[educationLevel];
      return levelEntry ? PROGRAMS_BY_LEVEL[levelEntry] || [] : [];
    }
    // Fallback to default if country not found
    const defaultEntry = GLOBAL_EDUCATION_REGISTRY.find(e => e.isoCode === 'DEFAULT');
    if (defaultEntry) {
      const levelEntry = defaultEntry.normalizer[educationLevel];
      return levelEntry ? PROGRAMS_BY_LEVEL[levelEntry] || [] : [];
    }
    return [];
  }
}
