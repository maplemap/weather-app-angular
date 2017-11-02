import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../app.service';
import { HelperService } from '../../_services/helper.service';
import { WeatherIconsService } from '../../_services/weather-icons.service';
import { Forecast } from './forecast';

import { apiConfig } from '../../config';

@Injectable()
export class ForecastService {
  private forecastUpdateInterval: number = 300000; // 5 minutes;
  private unitSystem: string;

  constructor(
    private http: Http,
    private appService: AppService,
    private weatherIconsService: WeatherIconsService,
    private helperService: HelperService
  ) {
    this.unitSystem = appService.unitSystem;
  }

  getForecastByCity(city: string): Observable<any> {
    return Observable.interval(this.forecastUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${apiConfig.host}/forecast/daily?q=${city}&appid=${apiConfig.appid}&units=${this.unitSystem}&cnt=${apiConfig.amountForecastDays}`)
          .map((response: Response) => response.json())
          .map((data) => data.list)
          .catch(this.handleError)
      );
  }

  handleResponseForecastData(responseData: any): Forecast {
    const { dt, temp, weather } = responseData;

    const date = dt * 1000;
    const iconClassname = this.weatherIconsService.getIconClassNameByCode(weather[0].id);
    const temperatureDay = Math.round(temp.day);
    const temperatureNight = Math.round(temp.night);

    return new Forecast(
      date,
      iconClassname,
      temperatureDay,
      temperatureNight,
      weather[0].description
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error', error);
    return Observable.throw(error.message || error);
  }
}
