import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { WeatherService } from './weather.service';
import { Weather } from './weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private _weatherSubscription: Subscription;
  weather: Weather;
  unitSystem: string;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {
    this.unitSystem = weatherService.getUnitSystem();
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { weather: Weather }) => {
        console.log('route suscribe', data.weather, new Date());
        this.weather = data.weather;
      }
    );

    this._weatherSubscription = this.weatherService.getWeather().subscribe(weather => {
      console.log('weatheChangeSubscribe', weather, new Date());
      this.weather = weather;
    });
  }

  ngOnDestroy() {
    this._weatherSubscription.unsubscribe();
  }
}
