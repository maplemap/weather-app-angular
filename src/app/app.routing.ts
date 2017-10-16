import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ResolveLocationService } from './_services/resolve-location.service';
import { ResolveCityService } from './_services/resolve-city.service';
import { WeatherComponent } from './weather/weather.component';

const APP_ROUTER: Routes = [
  { path: '', component: WeatherComponent, resolve: { weather: ResolveLocationService }},
  { path: ':city', component: WeatherComponent, resolve: { weather: ResolveCityService }}
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER)
