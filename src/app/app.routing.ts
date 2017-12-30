import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ResolveLocationService } from './shared/services/resolve-location.service';
import { CityCardResolver } from './city-card/city-card-resolver.service';
import { WeatherComponent } from './weather/weather.component';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';

const APP_ROUTER: Routes = [
  { path: '', component: WeatherComponent, resolve: { weather: ResolveLocationService } },
  { path: ':city', component: WeatherComponent, resolve: { weather: CityCardResolver } },
  { path: 'service/search', component: NotFoundComponent },
  {
    path: '**',
    component: ErrorComponent,
    data: { title: '404 Not Found', message: 'You may be lost. Follow the breadcrumbs back <a href="/">home</a>.' } }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);
