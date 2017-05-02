import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, Platform } from 'ionic-angular';
import { templateApp } from '../../app/app.component';
import { PlatformMock } from '../../mocks'
import { DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginWorkflow } from '../../providers/workflows/loginWorkflow';
import { CommonComponentsModule } from '../../commonComponents/commoncomponents.module';
import { ProductWorkflow } from '../../providers/workflows/productWorkflow';
import { SharedWorkflows } from '../../providers/workflows/sharedWorkflows';
import { ProductService } from "../../providers/services/productService";
import { ConsoleLogService } from "../../providers/services/logger";
import { Logger } from "../../providers/services/default-log-service";
import { WindowRef } from '../../store/windowClass';
import { HomePage } from '../../pages/home/home.component';
import { AboutPage } from '../../pages/about/about.component';
import { MockNgRedux } from '@angular-redux/store/testing';
import { RootState, enhancers, reimmutify, middleware } from '../../store/index';
import reducer from '../../store/index';

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

describe('Home Component', () => {
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
    fixture = TestBed.createComponent(HomePage);

    component = fixture.componentInstance;
    component.ngRedux.configureStore(
      reducer,
      {},
      middleware,
      enhancers
    );
  });

  it('should be created', () => {
    expect(component instanceof HomePage).toBe(true);
  });

  it('initializes with State changing being Home', done => {
    console.log(component['ngRedux']);
    console.log('asdasd ya');
    let app_state = component.ngRedux.select(state => state.app);
    app_state.subscribe(data => {
      if (data) {
        expect(data.get('page')).toEqual('Home')
        done();
      }
    }, null, done);
    // fixture.whenStable().then(() => {
    //   console.log(component['ngRedux']);

    //   console.log('asdasd ya');
    //   expect(component['currentPageState']).toBe(undefined);
    // })

  });

});