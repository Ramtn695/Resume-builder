import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return countries', () => {
    const countries = service.getCountries();
    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0]).toHaveProperty('name');
    expect(countries[0]).toHaveProperty('code');
  });
});
