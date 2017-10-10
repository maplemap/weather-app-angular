import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ResolveLocationService } from '../services/resolve-location.service';

import { WeatherComponent } from '../weather/weather.component';

const WEATHER_ROUTER: Routes = [
  { path: '', component: WeatherComponent, resolve: { weather: ResolveLocationService }}
]

export const weatherRouting: ModuleWithProviders = RouterModule.forRoot(WEATHER_ROUTER)
