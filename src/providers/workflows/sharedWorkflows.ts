import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { RootState } from '../../store/index';
import { FirebaseService } from '../services/firebaseService';

interface ISharedWorkflows {
    errorModalShow: void;
    errorModalHide: void;
    loaderShow: void;
    loaderHide: void;
    goToPage: void;
}

@Injectable()
export class SharedWorkflows {

    constructor(
        private ngRedux: NgRedux<RootState>
    ) {

    }

    errorModalShow(errorMessage = undefined) {
        this.ngRedux.dispatch({
            type: 'SHOW_ERROR_MODAL',
            payload: {
                message: (errorMessage) ? errorMessage : 'Server Error'
            }
        })
    }


    errorModalHide() {
        this.ngRedux.dispatch({
            type: 'HIDE_ERROR_MODAL'
        })
    }

    loaderShow() {
        this.ngRedux.dispatch({
            type: 'LOADER_SHOW'
        })
    }

    loaderHide() {
        this.ngRedux.dispatch({
            type: 'LOADER_HIDE'
        })
    }

    goToPage(page, pageParams = { index: 0 }) {
        this.ngRedux.dispatch({
            type: 'GO_TO_PAGE',
            payload: {
                page: page,
                pageParams: pageParams
            }
        })
    }

}
