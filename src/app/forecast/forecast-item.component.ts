import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.scss']
})
export class ForecastItemComponent {
  @Input() currentDay: boolean;
  @Input() date: number;
  @Input() temperatureDay: number;
  @Input() temperatureNight: number;
  @Input() description: string;
  @Input() iconClassname: string;
  @Input() measureOfTemp: string;
}
