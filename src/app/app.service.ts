import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  constructor() { }

  updateUnitSystem(unit: string) {
    console.log(unit);

  }
}
