import { Component, ViewChild } from '@angular/core';
import { LoginWorkflow } from '../../providers/workflows/loginWorkflow';
import { SharedWorkflows } from '../../providers/workflows/sharedWorkflows';
import { ConsoleLogService } from '../../providers/services/logger';
import { Observable } from "rxjs";
import { NgRedux, select } from '@angular-redux/store';
import { RootState } from '../../store/index';

@Component({
  selector: 'register-page',
  templateUrl: 'register.component.html'
})

export class RegisterPage {
  @select(['user', 'authenticated']) isAuthenticated$: Observable<any>;

  public currentPageState;
  public pageName = 'Register';
  constructor(
    private logger: ConsoleLogService,
    private _shared: SharedWorkflows,
    private _loginWorkflow: LoginWorkflow,
    private ngRedux: NgRedux<RootState>,
  ) {
    let app_state = this.ngRedux.select(state => state.app);
    app_state.subscribe((data) => {
      if (data) {
        this.currentPageState = data.get('page');
      }
    })
  }

  registerUser(userForm) {
    this._loginWorkflow.registerUser(userForm).subscribe(() => {
      console.log('this is done');
    });
    //this._shared.goToPage('Confirm-Register');
  }


  // goToRegister() {
  //   this._shared.goToPage('Register');
  // }

  ionViewDidEnter() {
    if (this.currentPageState !== this.pageName) {
      this._shared.goToPage(this.pageName);
    }
  }
}