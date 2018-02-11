import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchText = '';

  constructor(
    private router: Router
  ) { }

  onClickCleanBtn() {
    this.searchText = '';
  }

  onKeyPress(e: any) {
    if (e.keyCode === 13 && e.target.value) {
      const city = e.target.value;

      this.router.navigate([`/${city}`]);
      this.searchText = '';
    }
  }
}
