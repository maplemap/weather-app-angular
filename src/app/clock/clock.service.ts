import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClockService {
  private clock: Observable<Date>;

  constructor() {
    this.clock = Observable.interval(1000).startWith(0).map(tick => new Date()).share();
  }

  getClock(): Observable<Date> {
    return this.clock;
  }
}
