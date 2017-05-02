import { Injectable, ViewChild } from '@angular/core';
import 'rxjs/Rx';
import { Response } from '@angular/http';
import { NgRedux } from '@angular-redux/store';
import { RootState } from '../../store/index';
import { ProductService } from '../services/productService';
import { SharedWorkflows } from './sharedWorkflows';
import { Observable } from "rxjs";

@Injectable()
export class ProductWorkflow {
  public products;

  constructor(
    private ngRedux: NgRedux<RootState>,
    private _prod: ProductService,
    private _shrdWrkflw: SharedWorkflows
  ) {

  }

  getProducts() {
    let shrWrkFlw = this._shrdWrkflw;
    shrWrkFlw.loaderShow();
    return this._prod.getProducts().map((productList) => {
      this.ngRedux.dispatch({
        type: 'GET_ALL_PRODUCTS',
        payload: productList
      });
      shrWrkFlw.loaderHide();
    }).catch((error: any) => {
      shrWrkFlw.loaderHide();
      return Observable.throw(error.json());
    })
  }
}
