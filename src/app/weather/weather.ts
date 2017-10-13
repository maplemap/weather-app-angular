export class Weather {
  constructor(
    public city: string,
    public temp: number,
    public humidity: number,
    public pressureInHpa: number,
    public pressureInMmHg: number,
    public type: string,
    public sunrise: string,
    public sunset: string,
    public windDirection: string,
    public windSpeed: string,
    public img: string
  ) {}
}
