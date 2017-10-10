import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { Weather } from '../interfaces/weather';
import { api } from '../config';

@Injectable()
export class WeatherService {
  weatherUpdateInterval: number = 300000;
  forecastUpdateInterval: number = 900000;
  weather: Weather;

  constructor(private http: Http) { }

  getWeatherByСurrentLocation() {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        this.getWeatherByLocation(latitude, longitude).subscribe((responseData) => {
          this.weather = this.handleResponseWeatherData(responseData);
          resolve(this.weather);
        }
        );
      }, (error) => {
        if (error.code === 1) {
          this.getWeatherByCity('London').subscribe((responseData) => {
            this.weather = this.handleResponseWeatherData(responseData);
            resolve(this.weather);
          }
          );
        } else {
          this.handleError(error);
        }
      });
    })
  }

  getWeatherByLocation(latitude: number, longitude: number): Observable<Weather> {
    return Observable.interval(this.weatherUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${api.host}/weather?appid=${api.appid}&lat=${latitude}&lon=${longitude}&units=${api.units}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getWeatherByCity(city: string) {
    return Observable.interval(this.weatherUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${api.host}/weather?appid=${api.appid}&q=${city}&units=${api.units}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getForecastByLocation(latitude: number, longitude: number) {
    return Observable.interval(this.forecastUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${api.host}/forecast?appid=${api.appid}&lat=${latitude}&lon=${longitude}&units=${api.units}&cnt=${api.amountForecastDays}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  getForecastByCity(city: string) {
    return Observable.interval(this.forecastUpdateInterval).startWith(0)
      .switchMap(() =>
        this.http.get(`${api.host}/forecast?q=${city},us&appid=${api.appid}&units=${api.units}&cnt=${api.amountForecastDays}`)
          .map((response: Response) => response.json())
          .catch(this.handleError)
      );
  }

  private handleResponseWeatherData(responseData: any) {
    console.log(responseData);

    const { name, main, weather } = responseData;
    return new Weather(name, main.temp, weather[0].description, main.temp_min, main.temp_max, weather[0].icon);
  }

  private handleError(error: any) {
    console.error('Error', error);
    return Observable.throw(error.message || error)
  }

}
