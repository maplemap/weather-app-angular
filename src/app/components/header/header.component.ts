import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { api } from '../../config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() unitSystem: string;
  @Output() changeUnit: EventEmitter<boolean> = new EventEmitter();

  isUnitSwitcherChecked: boolean = false;

  ngOnInit() {
    this.isUnitSwitcherChecked = this.unitSystem === api.defaultUnit;
  }

  onChangeUnitSwitcher() {
    this.changeUnit.emit(this.isUnitSwitcherChecked);
  }
}
