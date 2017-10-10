import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { WeatherService } from '../weather/weather.service';

@Injectable()
export class ResolveLocationService implements Resolve<any> {
  constructor(private weatherService: WeatherService) { };

  resolve() {
    return this.weatherService.getWeatherByСurrentLocation();
  }
}
