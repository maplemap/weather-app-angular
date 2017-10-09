import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CityCardComponent } from './components/city/city-card/city-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherComponent } from './weather/weather.component';
import { weatherRouting } from './routes/weather.routing';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityCardComponent,
    SearchBarComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    weatherRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
