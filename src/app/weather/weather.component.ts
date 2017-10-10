import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../services/weather.service';
import { Weather } from '../interfaces/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather: Weather;
  // weatherClass: Weather;
  location: any = {};

  constructor(private weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { weather: Weather }) => {
        this.weather = data.weather;
      }
    )
  }

}
