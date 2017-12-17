import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DateService {
  private date: Observable<Date>;
  private locale = 'en-us';

  constructor() {
    this.date = Observable.interval(10000).startWith(0).map(() => new Date()).share();
  }

  getDate(): Observable<Date> {
    return this.date;
  }

  formatDate(date: Date): string {
    const month = date.toLocaleString(this.locale, { month: 'short' });
    const weekday = date.toLocaleString(this.locale, { weekday: 'short' });
    const day = date.toLocaleString(this.locale, { day: 'numeric' });

    return `${weekday} ${month}.${day}`;
  }
}
