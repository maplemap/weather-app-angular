import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchText: string = '';

  onClickCleanBtn() {
    this.searchText = '';
  }

  onKeyPress(e: any) {
    if (e.keyCode === 13 && e.target.value) {
      console.log(e.target.value);
    }
  }
}
