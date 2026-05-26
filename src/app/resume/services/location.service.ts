import { Injectable } from '@angular/core';
import { Country, State, City } from 'country-state-city';

export interface LocationItem {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getCountries(): LocationItem[] {
    return Country.getAllCountries()
      .map(c => ({ name: c.name, code: c.isoCode }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  getStates(countryCode: string): LocationItem[] {
    return State.getStatesOfCountry(countryCode)
      .map(s => ({ name: s.name, code: s.isoCode }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  getCities(countryCode: string, stateCode: string): string[] {
    return City.getCitiesOfState(countryCode, stateCode)
      .map(c => c.name)
      .sort((a, b) => a.localeCompare(b));
  }

  getCountryCode(countryName: string): string {
    const country = Country.getAllCountries().find(c => c.name === countryName);
    return country ? country.isoCode : '';
  }

  getStateCode(countryCode: string, stateName: string): string {
    const state = State.getStatesOfCountry(countryCode).find(s => s.name === stateName);
    return state ? state.isoCode : '';
  }
}
