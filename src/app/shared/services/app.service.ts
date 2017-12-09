import { Injectable } from '@angular/core';

import { LocalStorageService } from './localstorage.service';
import { appConfig } from '../../config';

@Injectable()
export class AppService {
  private unitSystem: string;

  constructor(private localStorageService: LocalStorageService) {
    this.unitSystem = this.localStorageService.get('unit') || appConfig.defaultUnit;
  }

  getUnitSystem(): string {
    return this.unitSystem;
  }

  updateUnitSystem(unitSystem: string): void {
    this.localStorageService.set('unit', unitSystem);

    setTimeout(() => window.location.reload(), 300);
  }
}
