import { Injectable, ViewChild } from '@angular/core';
import 'rxjs/Rx';
import { Response } from '@angular/http';
import { NgRedux } from '@angular-redux/store';
import { RootState } from '../../store/index';
import { FirebaseService } from '../services/firebaseService';
import { SharedWorkflows } from './sharedWorkflows';
import { Observable } from "rxjs";
import { ConsoleLogService } from '../services/logger';

@Injectable()
export class LoginWorkflow {
    constructor(
        private ngRedux: NgRedux<RootState>,
        private _frbSvc: FirebaseService,
        private _shrdWrkflw: SharedWorkflows,
        private _log: ConsoleLogService
    ) {

    }

    userLogin(email, pass): Observable<any> {
        let shrWrkFlw = this._shrdWrkflw;
        let frbSvc = this._frbSvc;
        let cons = this._log;
        shrWrkFlw.loaderShow();
        return Observable.create(observer => {
            frbSvc.userLogin(email, pass).then(function (loginResp) {
                frbSvc.addToLoginQueue(loginResp.uid).then(function () {
                    console.log('done 2');
                }, function () {
                    console.log('errored');
                });
                // frbSvc.addUser(loginResp).then(function () {

                // }, function () {
                //     console.log('errored');
                // })

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
