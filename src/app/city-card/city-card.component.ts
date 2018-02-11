import { Component, Input, OnInit } from '@angular/core';

import { Weather } from '../weather/weather';
import { apiConfig } from '../config';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit {
  @Input() weather: Weather;
  @Input() unitSystem: string;

  measureOfTemp: string;
  measureOfWindSpeed: string;
  measureOfPressure: string;

  ngOnInit() {
    const measurementUnits = apiConfig.measurementUnits[this.unitSystem];

    this.measureOfTemp = measurementUnits.temperature;
    this.measureOfWindSpeed = measurementUnits.windSpeed;
    this.measureOfPressure = measurementUnits.pressure;
  }
}
