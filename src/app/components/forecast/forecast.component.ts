import { Component, OnChanges, OnDestroy, Input } from '@angular/core';

import { ForecastService } from './forecast.service';
import { Forecast } from './forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnChanges {
  @Input() cityName: string;
  @Input() measureOfTemp: string;

  private firstWeekForecast: Forecast[];
  private secondWeekForecast: Forecast[];
  private subscribers: any = {};
  isSecondWeekForecastListShow: boolean = false;
  forecastDays: number;
  buttonLabel: string = 'More';

  constructor(
    private forecastService: ForecastService
  ) {}

  ngOnChanges(): void {
    if (this.subscribers.forecast) this.subscribers.forecast.unsubscribe();

    this.subscribers.forecast = this.forecastService.getForecastByCity(this.cityName)
      .subscribe((forecast) => {
        const forecastData = forecast.map(forecastByDay => this.forecastService.handleResponseForecastData(forecastByDay));

        this.firstWeekForecast = forecastData.slice(1, 8);
        this.secondWeekForecast = forecastData.slice(8, 15);

        this.recalculateForecastDays();
        console.log('forecast subscribe');

    });
  }

  toggleSecondWeekForecastList(): void {
    this.isSecondWeekForecastListShow = !this.isSecondWeekForecastListShow;
    this.buttonLabel = !this.isSecondWeekForecastListShow ? 'More' : 'Less';

    this.recalculateForecastDays();
  }

  private recalculateForecastDays(): void {
    const firstWeekForecastLength = this.firstWeekForecast.length;
    const secondWeekForecastLength = this.secondWeekForecast.length;

    this.forecastDays = !this.isSecondWeekForecastListShow ?
      firstWeekForecastLength : firstWeekForecastLength + secondWeekForecastLength;
  }

  ngOnDestroy(): void {
    this.subscribers.forecast.unsubscribe();
  }
}
