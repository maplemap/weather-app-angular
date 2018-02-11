export class Weather {
  constructor(
    public updateAt: number,
    public city: string,
    public iconClassname: string,
    public temp: number,
    public humidity: number,
    public pressure: number,
    public description: string,
    public sunrise: number,
    public sunset: number,
    public windDirection: string,
    public windSpeed: number,
    public windBeaufortScale: string
  ) {}
}
