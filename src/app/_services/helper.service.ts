import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  constructor() {}

  getTimeFromUnixTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();

    return `${hours.substr(-2)}:${minutes.substr(-2)}`;
  }

  getCurrentTimeinHHMM(): string {
    const today = new Date();
    const hours = '0' + today.getHours();
    const minutes = '0' + today.getMinutes();

    return `${hours.substr(-2)}:${minutes.substr(-2)}`;
  }

  getWindDirection(windDegree: number): string {
    const windDirectionIndex = Math.round((windDegree - 11.25) / 22.5);
    const windNames = ['North', 'North Northeast', 'Northeast', 'East Northeast', 'East', 'East Southeast', 'Southeast', 'South Southeast', 'South', 'South Southwest', 'Southwest', 'West Southwest', 'West', 'West Northwest', 'Northwest', 'North Northwest'];

    return windNames[windDirectionIndex];
  }

  getWindBeaufortScaleByMeterInSecond(windSpeed: number): string {
    const beaufortWindScale = ['calm', 'light air', 'light breeze', 'gentle breeze', 'moderate breeze', 'fresh breeze', 'strong breeze', 'high wind, near gale', 'gale', 'severe gale', 'storm', 'violent storm', 'hurricane'];
    let windSpeedIndex = 0;

    switch (true) {
      case (windSpeed < 0.3): windSpeedIndex = 0; break;
      case (0.3 <= windSpeed && windSpeed < 1.6): windSpeedIndex = 1; break;
      case (1.6 <= windSpeed && windSpeed < 3.5): windSpeedIndex = 2; break;
      case (3.4 <= windSpeed && windSpeed < 5.5): windSpeedIndex = 3; break;
      case (5.5 <= windSpeed && windSpeed < 8): windSpeedIndex = 4; break;
      case (8 <= windSpeed && windSpeed < 10.8): windSpeedIndex = 5; break;
      case (10.8 <= windSpeed && windSpeed < 13.9): windSpeedIndex = 6; break;
      case (13.9 <= windSpeed && windSpeed < 17.2): windSpeedIndex = 7; break;
      case (17.2 <= windSpeed && windSpeed < 20.8): windSpeedIndex = 8; break;
      case (20.8 <= windSpeed && windSpeed < 24.5): windSpeedIndex = 9; break;
      case (24.5 <= windSpeed && windSpeed < 28.5): windSpeedIndex = 10; break;
      case (28.5 <= windSpeed && windSpeed < 32.7): windSpeedIndex = 11; break;
      case (32.7 <= windSpeed): windSpeedIndex = 12; break;
    }

    return beaufortWindScale[windSpeedIndex];
  }

  getPressureInMmHg(pressureInHpa: number): number {
    const pressureInMmHg = Math.round(pressureInHpa * 0.75006375541921);

    return pressureInMmHg;
  }

  getPressureInInches(pressureInHpa: number): number {
    const pressureInInches = Math.round(pressureInHpa * 0.02961339710085);

    return pressureInInches;
  }
}
