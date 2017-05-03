import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SharedWorkflows } from '../../providers/workflows/sharedWorkflows';
import { ProductWorkflow } from '../../providers/workflows/productWorkflow';
import { ConsoleLogService } from '../../providers/services/logger';
import { RootState } from '../../store/index';

@Component({
  selector: 'about-page',
  templateUrl: 'about.component.html'
})

export class AboutPage {
  @select(['user', 'authenticated']) isAuthenticated$: Observable<any[]>;
  @select(['product', 'allProducts']) products$: Observable<any[]>;
  public currentPageState;
  public pageName = 'About';
  public products;
  constructor(
    private logger: ConsoleLogService,
    private _shared: SharedWorkflows,
    private _prod: ProductWorkflow,
    private ngRedux: NgRedux<RootState>,
  ) {
    let app_state = this.ngRedux.select(state => state.app);
    app_state.subscribe((data) => {
      if (data) {
        this.currentPageState = data.get('page');
      }
    })
    this._prod.getProducts().subscribe(() => {
      console.log('finished');
    })
  }

  ionViewDidEnter() {
    if (this.currentPageState !== this.pageName) {
      this._shared.goToPage(this.pageName);
    }
  }

}