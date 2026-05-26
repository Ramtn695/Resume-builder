import { Injectable } from '@angular/core';
import { Country, State, City } from 'country-state-city';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getCountries(): any[] {
    const countries = Country.getAllCountries();
    return countries.map(c => ({
      name: c.name,
      code: c.isoCode
    })).sort((a, b) => a.name.localeCompare(b.name));
  }

  getStates(countryCode: string): any[] {
    const states = State.getStatesOfCountry(countryCode);
    return states.map(s => ({
      name: s.name,
      code: s.isoCode
    })).sort((a, b) => a.name.localeCompare(b.name));
  }

  getCities(countryCode: string, stateCode: string): any[] {
    const cities = City.getCitiesOfState(countryCode, stateCode);
    return cities.map(c => c.name).sort((a, b) => a.localeCompare(b));
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
