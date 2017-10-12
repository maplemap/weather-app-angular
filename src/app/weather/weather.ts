export class Weather {
  constructor(
    public city: string,
    public temp: number,
    public type: string,
    public tempMin: string,
    public tempMax: string,
    public img: string
  ) {}
}
