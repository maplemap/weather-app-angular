import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { AppService } from '../app.service';
import { LoaderService } from '../components/loader/loader.service';
import { HelperService } from "../_services/helper.service";

import { Weather } from './weather';
import { apiConfig, appConfig } from '../config';
import * as wiDataByCode from '../data/wi-codes.data.json';

@Injectable()
export class WeatherService {
  weather: Weather;
  weatherChange: Subject<Weather> = new Subject<Weather>();
  wiDataByCode: any;
  unitSystem: string;
  weatherUpdateInterval: number = 300000; // 5 minutes
  forecastUpdateInterval: number = 900000;

  constructor(
    private http: Http,
    private appService: AppService,
    private loaderService: LoaderService,
    private helperService: HelperService
  ) {
    this.unitSystem = appService.unitSystem;
    this.wiDataByCode = wiDataByCode;

    this.weatherChange.subscribe((weather) => {
      this.weather = weather;
      console.log(this.weather);
    });
  }

  getWeatherByСurrentLocation(): Promise<any> {
    this.showLoader();

    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        this.getWeatherByLocation(latitude, longitude).subscribe((responseData) => {
          const weather = this.handleResponseWeatherData(responseData);

          this.weatherChange.next(weather);
          resolve(weather.city);

          this.hideLoader();
        }
        );
      }, (error) => {
        if (error.code === 1) {
          this.getWeatherByCity('London').subscribe((responseData) => {
            const weather = this.handleResponseWeatherData(responseData);

            this.weatherChange.next(weather);
            resolve(weather.city);

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
        const weather = this.handleResponseWeatherData(responseData);

        this.weatherChange.next(weather);
        resolve(weather);

        this.hideLoader();
      })
    })
  }

  getWeatherByLocation(latitude: number, longitude: number): Observable<any> {
    return Observable.interval(this.weatherUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${apiConfig.host}/weather?appid=${apiConfig.appid}&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getWeatherByCity(city: string): Observable<any> {
    return Observable.interval(this.weatherUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${apiConfig.host}/weather?appid=${apiConfig.appid}&q=${city}&units=${this.unitSystem}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getForecastByLocation(latitude: number, longitude: number): Observable<any> {
    return Observable.interval(this.forecastUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${apiConfig.host}/forecast?appid=${apiConfig.appid}&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}&cnt=${apiConfig.amountForecastDays}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getForecastByCity(city: string): Observable<any> {
    return Observable.interval(this.forecastUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${apiConfig.host}/forecast?q=${city},us&appid=${apiConfig.appid}&units=${this.unitSystem}&cnt=${apiConfig.amountForecastDays}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  private handleResponseWeatherData(responseData: any): Weather {
    const { name, main, weather, wind, sys } = responseData;
    console.log(responseData);


    const iconClassname = this.getIconClassNameByCode(weather[0].id, sys.sunset);
    const temperature = Math.round(main.temp);
    const pressureInHpa = Math.round(main.pressure);
    const pressureInMmHg = (this.unitSystem === appConfig.defaultUnit) ? this.helperService.getPressureInMmHg(pressureInHpa) : pressureInHpa;
    const windDegrees = Math.round(wind.deg);
    const windDirection =  this.helperService.getWindDirection(windDegrees);
    const windBeaufortScale = this.helperService.getWindBeaufortScaleByMeterInSecond(wind.speed);
    const sunriseTime = this.helperService.getTimeFromUnixTimestamp(sys.sunrise);
    const sunsetTime = this.helperService.getTimeFromUnixTimestamp(sys.sunset);

    return new Weather(
      name,
      iconClassname,
      temperature,
      main.humidity,
      pressureInHpa,
      pressureInMmHg,
      weather[0].description,
      sunriseTime,
      sunsetTime,
      windDirection,
      wind.speed,
      windBeaufortScale
    );
  }

  private getIconClassNameByCode(code: number, sunsetTimestamp: number): string {
    const classPrefix = 'wi wi-';
    const iconClassname = this.wiDataByCode[code].icon;
    let dayPrefix = 'day-';

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      const dateNowTimestamp = Math.round(Date.now()/1000);
      dayPrefix = (dateNowTimestamp > sunsetTimestamp) ? 'night-' : dayPrefix;
    }

    return `${classPrefix}${dayPrefix}${iconClassname}`;
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
