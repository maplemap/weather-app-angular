import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LocalStorageService } from "./_services/localstorage.service";
import { appConfig, apiConfig } from './config';

@Injectable()
export class AppService {
  unitSystem: string;

  constructor(private localStorageSevice: LocalStorageService) {
    this.unitSystem = this.localStorageSevice.get('unit') || appConfig.defaultUnit;
  }

  updateUnitSystem(unitStatus: boolean): void {
    const unitStatusInteger = +unitStatus;
    const unitSystem = apiConfig.units[unitStatusInteger];

    this.localStorageSevice.set('unit', unitSystem);
    window.location.reload();
  }
}
