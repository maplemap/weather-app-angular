import { Component } from '@angular/core';

import { AppService } from './app.service';
import { api } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private appService: AppService
  ) {}

  changeUnit(unitStatus: boolean) {
    const unitStatusInteger = +unitStatus;
    const unit = api.units[unitStatusInteger];

    this.appService.updateUnitSystem(unit);
  }
}
