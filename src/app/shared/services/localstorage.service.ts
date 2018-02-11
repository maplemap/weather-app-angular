import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() { }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    let value = localStorage.getItem(key);
    if (value) {
      value = JSON.parse(value);
    }

    return value;
  }
}
