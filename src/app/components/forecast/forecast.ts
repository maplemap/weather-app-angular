export class Forecast {
  constructor (
    public date: number,
    public iconClassname: string,
    public temperatureDay: number,
    public temperatureNight: number,
    public description: string,
  ) {}
}
