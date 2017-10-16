import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { LoaderService } from '../components/loader/loader.service';
import { HelperService } from "../_services/helper.service";

import { Weather } from './weather';
import { api } from '../config';

@Injectable()
export class WeatherService {
  weatherUpdateInterval: number = 300000;
  forecastUpdateInterval: number = 900000;
  weather: Weather;

  constructor(
    private http: Http,
    private loaderService: LoaderService,
    private helperService: HelperService
  ) { }

  getWeatherByСurrentLocation(): Promise<any> {
    this.showLoader();

    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        this.getWeatherByLocation(latitude, longitude).subscribe((responseData) => {
          this.weather = this.handleResponseWeatherData(responseData);
          resolve(this.weather.city);

          this.hideLoader();
        }
        );
      }, (error) => {
        if (error.code === 1) {
          this.getWeatherByCity('London').subscribe((responseData) => {
            this.weather = this.handleResponseWeatherData(responseData);
            resolve(this.weather.city);

            this.hideLoader();
          }
          );
        } else {
          console.error(error);
          this.hideLoader();
        }
      });
    })
  }

  createResponseWeatherByCity(city: string): Promise<any> { // TODO: I think, It shouldn't be so
    this.showLoader();

    return new Promise((resolve, reject) => {
      this.getWeatherByCity(city).subscribe((responseData) => {
        this.weather = this.handleResponseWeatherData(responseData);

        resolve(this.weather);
        this.hideLoader();
      })
    })
  }

  getWeatherByLocation(latitude: number, longitude: number): Observable<any> {
    return Observable.interval(this.weatherUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${api.host}/weather?appid=${api.appid}&lat=${latitude}&lon=${longitude}&units=${api.units}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getWeatherByCity(city: string): Observable<any> {
    return Observable.interval(this.weatherUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${api.host}/weather?appid=${api.appid}&q=${city}&units=${api.units}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getForecastByLocation(latitude: number, longitude: number): Observable<any> {
    return Observable.interval(this.forecastUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${api.host}/forecast?appid=${api.appid}&lat=${latitude}&lon=${longitude}&units=${api.units}&cnt=${api.amountForecastDays}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getForecastByCity(city: string): Observable<any> {
    return Observable.interval(this.forecastUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${api.host}/forecast?q=${city},us&appid=${api.appid}&units=${api.units}&cnt=${api.amountForecastDays}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  handleResponseWeatherData(responseData: any): Weather {
    console.log(responseData);

    const { name, main, weather, wind, sys } = responseData;
    const temperature = Math.round(main.temp);
    const pressureInHpa = Math.round(main.pressure);
    const pressureInMmHg = this.helperService.getPressureInMmHg(pressureInHpa);
    const windDegrees = Math.round(wind.deg);
    const windDirection = this.helperService.getWindDirection(windDegrees);
    const windBeaufortScale = this.helperService.getWindBeaufortScaleByMeterInSecond(wind.speed);
    const sunriseTime = this.helperService.getTimeFromUnixTimestamp(sys.sunrise);
    const sunsetTime = this.helperService.getTimeFromUnixTimestamp(sys.sunset);

    return new Weather(
      name,
      temperature,
      main.humidity,
      pressureInHpa,
      pressureInMmHg,
      weather[0].description,
      sunriseTime,
      sunsetTime,
      windDirection,
      wind.speed,
      windBeaufortScale,
      weather[0].icon
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error', error);
    return Observable.throw(error.message || error)
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}
