import { Component, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'no-access',
  templateUrl: 'noAccess.component.html'
})

export class NoAccessComponent {
  @Input() errorText: string;
  @Input() isAuthenticated: boolean;
  @Input() loading: boolean;

  constructor(
  ) { }


}