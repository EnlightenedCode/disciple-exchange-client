import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, Platform } from 'ionic-angular';
import { templateApp } from './app.component';
import { PlatformMock } from '../mocks'
import { DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginWorkflow } from '../providers/workflows/loginWorkflow';
import { CommonComponentsModule } from '../commonComponents/commoncomponents.module';
import { ProductWorkflow } from '../providers/workflows/productWorkflow';
import { SharedWorkflows } from '../providers/workflows/sharedWorkflows';
import { ProductService } from "../providers/services/productService";
import { ConsoleLogService } from "../providers/services/logger";
import { Logger } from "../providers/services/default-log-service";
import { WindowRef } from '../store/windowClass';
import { HomePage } from '../pages/home/home.component';
import { AboutPage } from '../pages/about/about.component';

const myFirebaseConfig = {
    apiKey: 'AIzaSyBfGF30lqLx6Mm-nVfSwb7rOuOnZBYmnkY',
    authDomain: 'disciple-exchange.firebaseapp.com',
    databaseURL: 'https://disciple-exchange.firebaseio.com',
    projcetId: 'disciple-exchange',
    storageBucket: 'disciple-exchange.appspot.com',
    messagingSenderId: '893716687856'
};

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};

describe('MyApp Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [templateApp,
                HomePage,
                AboutPage],
            imports: [
                BrowserModule,
                NgReduxModule,
                CommonComponentsModule,
                HttpModule,
                AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
                IonicModule.forRoot(templateApp, {
                    preloadModules: true,
                    platforms: {
                        ios: {
                            mode: 'md',
                        }
                    }
                }, {
                        links: [
                            { component: HomePage, name: 'Home', segment: 'home' },
                            { component: AboutPage, name: 'About', segment: 'about' }
                        ],
                    })
            ],
            providers: [
                {
                    provide: Logger,
                    useClass: ConsoleLogService
                },
                DevToolsExtension, LoginWorkflow, SharedWorkflows, ConsoleLogService, ProductWorkflow, ProductService, WindowRef,
                { provide: Platform, useClass: PlatformMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(templateApp);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof templateApp).toBe(true);
    });

    it('should have two loggedOut Pages', () => {
        expect(component.loggedOutPages.length).toBe(2);
    });

    it('initialises with a root page of HomePage', () => {
        expect(component['rootPage']).toBe(HomePage);
    });

});