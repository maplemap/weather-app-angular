/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService]
    });
  });

  it('should ...', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});
