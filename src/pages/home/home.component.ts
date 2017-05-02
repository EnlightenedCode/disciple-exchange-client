import { Component, ViewChild } from '@angular/core';
import { LoginWorkflow } from '../../providers/workflows/loginWorkflow';
import { SharedWorkflows } from '../../providers/workflows/sharedWorkflows';
import { ConsoleLogService } from '../../providers/services/logger';
import { Observable } from "rxjs";
import { NgRedux, select } from '@angular-redux/store';
import { RootState } from '../../store/index';

@Component({
  selector: 'home-page',
  templateUrl: 'home.component.html'
})

export class HomePage {


  public currentPageState;
  public pageName = 'Home';
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

  submitLogin(formData) {

    this._loginWorkflow.userLogin(formData.email, formData.password).subscribe(() => {
      this.logger.log('in here now');
    }, error => {
      this.logger.log('this errored yo');
    });
  }

  ionViewDidEnter() {
    if (this.currentPageState !== this.pageName) {
      this._shared.goToPage(this.pageName);
    }
  }
}