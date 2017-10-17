import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() changeUnit: EventEmitter<boolean> = new EventEmitter();

  onChangeUnitSwitcher(e: any) {
    this.changeUnit.emit(e.target.checked);
  }
}
