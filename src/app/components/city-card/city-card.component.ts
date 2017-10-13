import { Component, Input, OnInit } from '@angular/core';

import { Weather } from '../../weather/weather';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit {
  @Input() weather: Weather;

  constructor() { }

  ngOnInit() {

  }
}
