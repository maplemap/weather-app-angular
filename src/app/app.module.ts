import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CityCardComponent } from './city-card/city-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherComponent } from './components/weather/weather.component';
import { LoaderComponent } from './components/loader/loader.component';

import { appRouting } from './app.routing';

import { UiSwitchModule } from 'ngx-ui-switch';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from './components/error/error.component';
import { ClockComponent } from './components/clock/clock.component';
import { DateComponent } from './components/date/date.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastItemComponent } from './components/forecast/forecast-item/forecast-item.component';

import { AppService } from './app.service';
import { LocalStorageService } from './shared/services/localstorage.service';
import { WeatherService } from './components/weather/weather.service';
import { ResolveLocationService } from './shared/services/resolve-location.service';
import { ResolveCityService } from './shared/services/resolve-city.service';
import { HelperService } from './shared/services/helper.service';
import { LoaderService } from './components/loader/loader.service';
import { ClockService } from './components/clock/clock.service';
import { DateService } from './components/date/date.service';
import { ForecastService } from './components/forecast/forecast.service';
import { WeatherIconsService } from './shared/services/weather-icons.service';

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
