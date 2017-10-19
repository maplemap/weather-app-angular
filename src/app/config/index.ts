export const appConfig = {
  defaultUnit: 'metric'
}

export const apiConfig = {
  host: 'http://api.openweathermap.org/data/2.5',
  appid: '0f3fb9fa31ad3d41f1bb2bd0841c3f2f',
  measurementUnits: {
    metric: {
      temperature: 'C',
      windSpeed: 'm/s',
      pressure: 'mmHg'
    },
    imperial: {
      temperature: 'F',
      windSpeed: 'mil/h',
      pressure: 'hPa'
    }
  },
  amountForecastDays: 16
}
