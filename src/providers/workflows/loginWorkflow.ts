import { Injectable, ViewChild } from '@angular/core';
import 'rxjs/Rx';
import { Response } from '@angular/http';
import { NgRedux } from '@angular-redux/store';
import { RootState } from '../../store/index';
import { FirebaseService } from '../services/firebaseService';
import { AuthService } from '../services/authService';
import { SharedWorkflows } from './sharedWorkflows';
import { Observable } from "rxjs";
import { ConsoleLogService } from '../services/logger';

@Injectable()
export class LoginWorkflow {
    constructor(
        private ngRedux: NgRedux<RootState>,
        private _frbSvc: FirebaseService,
        private _shrdWrkflw: SharedWorkflows,
        private _log: ConsoleLogService,
        private _authSvc: AuthService
    ) {

    }

    userLogout(): Observable<any> {
        let shrWrkFlw = this._shrdWrkflw;
        let frbSvc = this._frbSvc;
        let cons = this._log;
        let ngRedux = this.ngRedux;
        shrWrkFlw.loaderShow();
        console.log('user logout');
        return Observable.create(observer => {
            console.log('here 33');
            frbSvc.userLogout().then(function () {
                shrWrkFlw.goToPage('Home');

                shrWrkFlw.loaderHide();
                console.log('hasdasdsa');

                observer.next('done');
            }, function (err) {
                shrWrkFlw.loaderHide();
                shrWrkFlw.errorModalShow('Unable to logout. Contact Support');
                observer.error(err);
            });
        });
    }

    registerUser(userForm): Observable<any> {
        let shrWrkFlw = this._shrdWrkflw;
        let frbSvc = this._frbSvc;
        let cons = this._log;
        let ngRedux = this.ngRedux;
        let authSvc = this._authSvc;
        shrWrkFlw.loaderShow();
        console.log('user sign up');
        return Observable.create(observer => {
            console.log('here 33');
            // console.log(authSvc.authState);
            // observer.next('done');
            console.log(userForm);
            frbSvc.createNewUser(userForm).then(function (userInfo) {
                console.log('user info:');
                console.log(userInfo);
                frbSvc.addToRegisterQueue(userInfo.uid, userForm).then(function () {
                    // ngRedux.dispatch({
                    //     type: 'USER_LOGIN',
                    //     payload: {
                    //         email: email,
                    //         name: 'Andrew Alanis',
                    //         isAdmin: true
                    //     }
                    // })
                    shrWrkFlw.loaderHide();
                    shrWrkFlw.goToPage('Confirm-Register');
                    observer.next('done');
                    console.log('done 2');
                }, function (err2) {
                    console.log('errored');
                    observer.error(err2);
                });

            }, function (err) {
                console.log('errored here');
                shrWrkFlw.loaderHide();
                shrWrkFlw.errorModalShow('Unable to register User. Contact Support');
                observer.error(err);
            });
        });
    }



    userLogin(email, pass): Observable<any> {
        let shrWrkFlw = this._shrdWrkflw;
        let frbSvc = this._frbSvc;
        let cons = this._log;
        let ngRedux = this.ngRedux;
        shrWrkFlw.loaderShow();
        return Observable.create(observer => {
            frbSvc.userLogin(email, pass).then(function (loginResp) {
                console.log('after login response');
                console.log(loginResp);
                frbSvc.addToLoginQueue(loginResp.uid, email).then(function () {
                    ngRedux.dispatch({
                        type: 'USER_LOGIN',
                        payload: {
                            email: email,
                            name: 'Andrew Alanis',
                            isAdmin: true
                        }
                    })
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
