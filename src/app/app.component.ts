import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unitSystem: string;

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.unitSystem = this.appService.getUnitSystem();
  }

  changeUnit(unitStatus: boolean) {
    this.appService.updateUnitSystem(unitStatus);
  }
}
