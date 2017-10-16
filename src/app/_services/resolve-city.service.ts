import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { WeatherService } from '../weather/weather.service';

@Injectable()
export class ResolveCityService implements Resolve<any> {
  constructor(
    private weatherService: WeatherService
  ) { };

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return (
      this.weatherService.weather
        ? this.weatherService.weather
        : this.weatherService.createResponseWeatherByCity(route.params.city)
    );
  }
}
