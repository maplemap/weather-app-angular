export const appConfig = {
  defaultUnit: 'metric'
}

export const apiConfig = {
  host: 'http://api.openweathermap.org/data/2.5',
  appid: '0f3fb9fa31ad3d41f1bb2bd0841c3f2f',
  units: ['metric', 'imperial'],
  measurementUnits: {
    metric: {},
    imperial: {}
  },
  amountForecastDays: 16
}
