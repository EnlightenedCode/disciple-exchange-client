import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Platform, Nav } from 'ionic-angular';
import { HomePage } from '../pages/home/home.component';
import { Observable } from 'rxjs/Observable';
import { AboutPage } from '../pages/about/about.component';
import { NgRedux, select } from '@angular-redux/store';
import { RootState, enhancers, reimmutify, middleware } from '../store/index';
import reducer from '../store/index';
import { WindowRef } from '../store/windowClass';
import { ConsoleLogService } from '../providers/services/logger';
import { SharedWorkflows } from '../providers/workflows/sharedWorkflows';
import { LoginWorkflow } from '../providers/workflows/loginWorkflow';
import { createLogger } from 'redux-logger';

export interface PageInterface {
    title: string;
    name: string;
    component: any;
    icon: string;
    logsOut?: boolean;
    index?: number;
    tabName?: string;
    tabComponent?: any;
}


@Component({
    templateUrl: 'app.component.html'
})



export class templateApp {
    @select(['app', 'loading']) loader$: Observable<any[]>;
    @select(['app', 'errorModal']) errorModal$: Observable<boolean>;
    @select(['app', 'errorMessage']) errorMessage$: Observable<string>;
    @select(['user', 'authenticated']) isAuthenticated$: Observable<any[]>;
    @ViewChild(Nav) nav: Nav;



    loggedOutPages: PageInterface[] = [
        { title: 'Home', name: 'Home', component: HomePage, icon: 'log-in' },
        { title: 'About', name: 'About', component: AboutPage, icon: 'information-circle' }
    ];

    rootPage: any;

    constructor(
        private ngRedux: NgRedux<RootState>,
        private logger: ConsoleLogService,
        public events: Events,
        public sharedWrkflws: SharedWorkflows,
        public loginWrkflw: LoginWorkflow,
        public menu: MenuController,
        public platform: Platform,
        public win: WindowRef
    ) {
        this.rootPage = HomePage;
        this.platformReady();
        this.ngRedux.configureStore(
            reducer,
            {},
            middleware,
            enhancers
        );
    }

    ngOnInit() {
        this.sharedWrkflws.loaderHide();
        this.applyStateToWindow(this.win.nativeWindow);

        let stateOriginal = this.ngRedux.select(state => state);
        stateOriginal.subscribe(() => {
            this.applyStateToWindow(this.win.nativeWindow);
        });

        let app_state = this.ngRedux.select(state => state.app);
        app_state.subscribe((data) => {

            if (data.get('page')) {

                if (this.nav && this.nav.getActive() && this.nav.getActive().name.replace('Page', '') !== data.get('page')) {
                    if (data.get('pageParams').index && data.get('pageParams').index > 0) {
                        this.nav.push(data.get('page'), data.get('pageParams')).catch((err: any) => {
                            this.logger.log(`Didn't set push nav: ${err}`);
                        });
                    } else {
                        this.nav.setRoot(data.get('page'), data.get('pageParams')).catch((err: any) => {
                            this.logger.log(`Didn't set nav root: ${err}`);
                        });
                    }
                }
            }
        });
    }

    dismissErrorModal() {
        this.sharedWrkflws.errorModalHide();
    }

    shouldShowMenu() {
        return false;
    }

    applyStateToWindow(win) {
        var objectStore = {};
        var that = this;
        Object.keys(this.ngRedux.getState()).forEach(function(key, index) {
            objectStore[key] = that.ngRedux.getState()[key].toJS();
        })
        win.store = objectStore;
    }

    platformReady() {
        // Call any initial plugins when ready
        this.platform.ready().then(() => {
            //   this.splashScreen.hide();ss
        });
    }


    openPage(page: PageInterface) {
        let params = {};

        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            params = { tabIndex: page.index };
        }

        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menu
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
            // Set the root of the nav with params if it's a tab index
        } else {
            this.logger.log(page.name);
            this.logger.log(params);
            this.nav.setRoot(page.name, params).catch((err: any) => {
                this.logger.log(`Didn't set nav root: ${err}`);
            });
        }
    }

    enableMenu(loggedIn: boolean) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    }

    logout() {
        let ngRedux = this.ngRedux;
        this.loginWrkflw.userLogout().subscribe(() => {
            console.log('finished logging out');
            setTimeout(function() {
                ngRedux.dispatch({
                    type: 'USER_LOGOUT'
                });
            }, 100)
        });
    }

    isActive(page: PageInterface) {
        let childNav = this.nav.getActiveChildNav();

        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabName) {
                return 'primary';
            }
            return;
        }

        if (this.nav.getActive() && this.nav.getActive().name === page.name) {
            return 'primary';
        }
        return;
    }

}