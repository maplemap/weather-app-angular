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
  private weather: Weather;
  private unitSystem: string;
  private _weatherSubscription: Subject<Weather> = new Subject<Weather>();
  public subscribers: any = {};
  private wiDataByCode: any;
  private weatherUpdateInterval: number = 300000; // 5 minutes
  private forecastUpdateInterval: number = 900000;

  constructor(
    private http: Http,
    private appService: AppService,
    private loaderService: LoaderService,
    private helperService: HelperService
  ) {
    this.unitSystem = appService.unitSystem;
    this.wiDataByCode = wiDataByCode;
  }

  getWeather(): Subject<Weather> {
    return this._weatherSubscription;
  }

  getUnitSystem(): string {
    return this.unitSystem;
  }

  getWeatherByСurrentLocation(): Promise<any> {
    this.showLoader();
    if (this.subscribers.city) this.subscribers.city.unsubscribe(); // TODO: I think, It shouldn't be so

    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        this.subscribers.city = this.getWeatherByLocation(latitude, longitude).subscribe((weather) => {
          resolve(weather.city);

          this.hideLoader();
        }
        );
      }, (error) => {
        if (error.code === 1) {
          this.subscribers.city = this.getWeatherByCity('London').subscribe((weather) => {
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
    if (this.subscribers.city) this.subscribers.city.unsubscribe(); // TODO: I think, It shouldn't be so


    return new Promise((resolve, reject) => {
      this.subscribers.city = this.getWeatherByCity(city).subscribe((weather) => {
        resolve(weather);

        this.hideLoader();
      }, (error) => {
        reject(error);
        this.hideLoader();
      })
    })
  }

  getWeatherByLocation(latitude: number, longitude: number): Observable<any> {
    return Observable.interval(this.weatherUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${apiConfig.host}/weather?appid=${apiConfig.appid}&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`)
          .map((response: Response) => response.json())
          .map((data) => {
            const weather = this.handleResponseWeatherData(data);

            this._weatherSubscription.next(weather);
            return weather;
          })
          .catch(this.handleError)
      );
  }

  getWeatherByCity(city: string): Observable<any> {
     return Observable.interval(this.weatherUpdateInterval).startWith(0)
      .switchMap(() => {
        return this.http.get(`${apiConfig.host}/weather?appid=${apiConfig.appid}&q=${city}&units=${this.unitSystem}`)
          .map((response: Response) => response.json())
          .map((data) => {
            const weather = this.handleResponseWeatherData(data);

            this._weatherSubscription.next(weather);
            return weather;
          })
          .catch(this.handleError)
      }
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

    const updateAt = new Date().getTime();
    const iconClassname = this.getIconClassNameByCode(weather[0].id, sys.sunset);
    const temperature = Math.round(main.temp);
    const pressureInHpa = Math.round(main.pressure);
    const pressureInMmHg = (this.unitSystem === appConfig.defaultUnit) ? this.helperService.getPressureInMmHg(pressureInHpa) : pressureInHpa;
    const windDegrees = Math.round(wind.deg);
    const windDirection =  this.helperService.getWindDirection(windDegrees);
    const windBeaufortScale = this.helperService.getWindBeaufortScaleByMeterInSecond(wind.speed);
    const sunriseTime = sys.sunrise * 1000;
    const sunsetTime = sys.sunset * 1000;

    return new Weather(
      updateAt,
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
    let iconClassname = this.wiDataByCode[code].icon;
    let dayPrefix = '';

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      const dateNowTimestamp = Math.round(Date.now()/1000);
      dayPrefix = (dateNowTimestamp > sunsetTimestamp) ? 'night-' : 'day-';

      if (dateNowTimestamp > sunsetTimestamp && iconClassname === 'sunny') {
        dayPrefix = 'night-clear';
        iconClassname = '';
      }
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
