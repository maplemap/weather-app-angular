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

import { weatherRouting } from './routes/weather.routing';

import { WeatherService } from './weather/weather.service';
import { ResolveLocationService } from './_services/resolve-location.service';
import { LoaderService } from './components/loader/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityCardComponent,
    SearchBarComponent,
    WeatherComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    weatherRouting
  ],
  providers: [
    WeatherService,
    ResolveLocationService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
