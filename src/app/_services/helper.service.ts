import { Injectable } from "@angular/core";

@Injectable()
export class HelperService {
  constructor() {}

  getTimeFromUnixTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();

    return `${hours.substr(-2)}:${minutes.substr(-2)}`;
  }

  getWindDirection(windDegree: number): string {
    const windDirectionIndex = Math.round((windDegree - 11.25) / 22.5);
    const windNames = ["North", "North Northeast", "Northeast", "East Northeast", "East", "East Southeast", "Southeast", "South Southeast", "South", "South Southwest", "Southwest", "West Southwest", "West", "West Northwest", "Northwest", "North Northwest"];

    return windNames[windDirectionIndex];
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
