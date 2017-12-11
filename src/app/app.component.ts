import { Component, OnInit } from '@angular/core';

import { AppService } from './shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unitSystem: string;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.unitSystem = this.appService.getUnitSystem();
  }

  changeUnit(unitSystem: string) {
    this.appService.updateUnitSystem(unitSystem);
  }
}
