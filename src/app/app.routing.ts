import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ResolveLocationService } from './shared/services/resolve-location.service';
import { ResolveCityService } from './shared/services/resolve-city.service';
import { WeatherComponent } from './components/weather/weather.component';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const APP_ROUTER: Routes = [
  { path: '', component: WeatherComponent, resolve: { weather: ResolveLocationService } },
  { path: ':city', component: WeatherComponent, resolve: { weather: ResolveCityService } },
  { path: 'service/search', component: NotFoundComponent },
  { path: '**', component: ErrorComponent, data: { title: '404 Not Found', message: 'You may be lost. Follow the breadcrumbs back <a href="/">home</a>.' } }
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER)
