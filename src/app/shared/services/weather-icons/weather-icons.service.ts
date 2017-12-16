import { Injectable } from '@angular/core';

import * as wiDataByCode from './weather-icons-codes.data.json';

@Injectable()
export class WeatherIconsService {
  private wiDataByCode: any;

  constructor() {
    this.wiDataByCode = wiDataByCode;
  }

  getIconClassNameByCode(code: number, sunsetTimestamp: number = 0): string {
    const classPrefix = 'wi wi-';
    let iconClassname = this.wiDataByCode[code].icon;
    let dayPrefix = '';

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      const dateNowTimestamp = Math.round(Date.now() / 1000);
      dayPrefix = (sunsetTimestamp && (dateNowTimestamp > sunsetTimestamp)) ? 'night-' : 'day-';

      if (sunsetTimestamp && dateNowTimestamp > sunsetTimestamp && iconClassname === 'sunny') {
        dayPrefix = 'night-clear';
        iconClassname = '';
      }
    }

    return `${classPrefix}${dayPrefix}${iconClassname}`;
  }
}
