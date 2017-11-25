import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  title: string;
  message: string;

  constructor(route: ActivatedRoute) {
    route.data.subscribe((data) => {
      this.title = data.title;
      this.message = data.message;
    });
  }
}
