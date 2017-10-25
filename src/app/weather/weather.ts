export class Weather {
  constructor(
    public updateAtHHMM: string,
    public city: string,
    public iconClassname: string,
    public temp: number,
    public humidity: number,
    public pressureInHpa: number,
    public pressureInMmHg: number,
    public description: string,
    public sunrise: string,
    public sunset: string,
    public windDirection: string,
    public windSpeed: number,
    public windBeaufortScale: string
  ) {}
}
