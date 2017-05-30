import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, NavController } from 'ionic-angular';
import { templateApp } from './app.component';
import { HomePage } from '../pages/home/home.component';
import { AboutPage } from '../pages/about/about.component';
import { RegisterPage } from '../pages/register/register.component';
import { ConfirmRegisterPage } from '../pages/confirm-register/confirm-register.component';
import { NgRedux } from '@angular-redux/store';
import { DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { CommonComponentsModule } from '../commonComponents/commoncomponents.module';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginWorkflow } from '../providers/workflows/loginWorkflow';
import { ProductWorkflow } from '../providers/workflows/productWorkflow';
import { SharedWorkflows } from '../providers/workflows/sharedWorkflows';
import { ProductService } from "../providers/services/productService";
import { AuthService } from "../providers/services/authService";
import { ConsoleLogService } from "../providers/services/logger";
import { Logger } from "../providers/services/default-log-service";
import { WindowRef } from '../store/windowClass';
import { ErrorModalComponent } from '../commonComponents/errorModal/error-modal.component';
import { ErrorComponent } from '../commonComponents/errorModal/error-modal.component';

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


@NgModule({
    declarations: [
        templateApp,
        HomePage,
        AboutPage,
        RegisterPage,
        ConfirmRegisterPage
    ],
    imports: [
        BrowserModule,
        NgReduxModule,
        CommonComponentsModule,
        HttpModule,
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
                    { component: AboutPage, name: 'About', segment: 'about' },
                    { component: RegisterPage, name: 'Register', segment: 'register' },
                    { component: ConfirmRegisterPage, name: 'Confirm-Register', segment: 'confirm-register' }
                ],
            }),
        AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        templateApp,
        ErrorModalComponent,
        ErrorComponent,
        HomePage,
        AboutPage,
        RegisterPage,
        ConfirmRegisterPage
    ],
    providers: [
        {
            provide: Logger,
            useClass: ConsoleLogService
        },
        DevToolsExtension, LoginWorkflow, SharedWorkflows, ConsoleLogService, ProductWorkflow, ProductService, AuthService, WindowRef]
})

export class AppModule {

}
