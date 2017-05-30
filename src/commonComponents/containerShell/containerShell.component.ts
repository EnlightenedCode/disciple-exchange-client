import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'container-shell',
  templateUrl: 'containerShell.component.html'
})

export class ContainerShellComponent {

  @Input() headerText: string;
  @Input() isAuthenticated: boolean;

  constructor(

  ) {

  }


}