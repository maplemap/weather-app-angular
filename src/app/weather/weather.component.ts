import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { WeatherService } from './weather.service';
import { Weather } from './weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather: Weather;
  unitSystem: string;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {
    this.unitSystem = weatherService.unitSystem;
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { weather: Weather }) => {
        console.log('route suscribe', data.weather, new Date());
        this.weather = data.weather;
      }
    );

    this.weatherService.weatherChange.subscribe(weather => {
      console.log('weatheChangeSubscribe', weather, new Date());
      this.weather = weather;
    });
  }
}
