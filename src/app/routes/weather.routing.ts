import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { WeatherComponent } from '../weather/weather.component';

const WEATHER_ROUTER: Routes = [
  { path: '', component: WeatherComponent }
]

export const weatherRouting: ModuleWithProviders = RouterModule.forRoot(WEATHER_ROUTER)
