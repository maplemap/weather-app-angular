import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CityCardComponent } from './city-card/city-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherComponent } from './weather/weather.component';
import { LoaderComponent } from './loader/loader.component';

import { appRouting } from './app.routing';

import { UiSwitchModule } from 'ngx-ui-switch';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { ClockComponent } from './clock/clock.component';
import { DateComponent } from './date/date.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastItemComponent } from './forecast/forecast-item/forecast-item.component';

import { AppService } from './app.service';
import { LocalStorageService } from './shared/services/localstorage.service';
import { WeatherService } from './weather/weather.service';
import { ResolveLocationService } from './shared/services/resolve-location.service';
import { ResolveCityService } from './shared/services/resolve-city.service';
import { HelperService } from './shared/services/helper.service';
import { LoaderService } from './loader/loader.service';
import { ClockService } from './clock/clock.service';
import { DateService } from './date/date.service';
import { ForecastService } from './forecast/forecast.service';
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
