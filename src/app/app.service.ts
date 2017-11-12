import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LocalStorageService } from "./_services/localstorage.service";
import { appConfig, apiConfig } from './config';

@Injectable()
export class AppService {
  private unitSystem: string;

  constructor(private localStorageSevice: LocalStorageService) {
    this.unitSystem = this.localStorageSevice.get('unit') || appConfig.defaultUnit;
  }

  getUnitSystem(): string {
    return this.unitSystem;
  }

  updateUnitSystem(unitSystem: string): void {
    this.localStorageSevice.set('unit', unitSystem);

    setTimeout(() => window.location.reload(), 300);
  }
}
