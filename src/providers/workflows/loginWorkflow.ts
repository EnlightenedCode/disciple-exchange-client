import { Injectable, ViewChild } from '@angular/core';
import 'rxjs/Rx';
import { Response } from '@angular/http';
import { NgRedux } from '@angular-redux/store';
import { RootState } from '../../store/index';
import { FirebaseService } from '../services/firebaseService';
import { SharedWorkflows } from './sharedWorkflows';
import { Observable } from "rxjs";

@Injectable()
export class LoginWorkflow {
    constructor(
        private ngRedux: NgRedux<RootState>,
        private _frbSvc: FirebaseService,
        private _shrdWrkflw: SharedWorkflows
    ) {

    }

    userLogin(email, pass): Observable<any> {
        let shrWrkFlw = this._shrdWrkflw;
        shrWrkFlw.loaderShow();
        return Observable.create(observer => {
            this._frbSvc.userLogin(email, pass).then(function () {
                shrWrkFlw.loaderHide();
                shrWrkFlw.goToPage('About');
                observer.next('done');
            }, function (err) {
                shrWrkFlw.loaderHide();
                shrWrkFlw.errorModalShow('Unable to login with given Login / Password.');
                observer.error(err);
            });
        });
    }

}
