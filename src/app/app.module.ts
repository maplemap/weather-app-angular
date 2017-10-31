import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CityCardComponent } from './components/city-card/city-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherComponent } from './weather/weather.component';
import { LoaderComponent } from './components/loader/loader.component';

import { appRouting } from './app.routing';

import { AppService } from './app.service';
import { UiSwitchModule } from '../../node_modules/angular2-ui-switch/src';
import { LocalStorageService } from './_services/localstorage.service';
import { WeatherService } from './weather/weather.service';
import { ResolveLocationService } from './_services/resolve-location.service';
import { ResolveCityService } from './_services/resolve-city.service';
import { HelperService } from './_services/helper.service';
import { LoaderService } from './components/loader/loader.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from './components/error/error.component';
import { ClockComponent } from './components/clock/clock.component';
import { ClockService } from './components/clock/clock.service';
import { DateComponent } from './components/date/date.component';
import { DateService } from './components/date/date.service';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastService } from './components/forecast/forecast.service';
import { WeatherIconsService } from './_services/weather-icons.service';
import { ForecastItemComponent } from './components/forecast/forecast-item/forecast-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityCardComponent,
    SearchBarComponent,
    WeatherComponent,
    LoaderComponent,
    NotFoundComponent,
    ErrorComponent,
    ClockComponent,
    DateComponent,
    ForecastComponent,
    ForecastItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    appRouting,
    UiSwitchModule
  ],
  providers: [
    AppService,
    LocalStorageService,
    WeatherService,
    ResolveLocationService,
    ResolveCityService,
    LoaderService,
    HelperService,
    ClockService,
    DateService,
    ForecastService,
    WeatherIconsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
