'use strict';
const admin = require('firebase-admin');
var request = require('request');
const HW = require('./hw')
var myFunctions = require('./index');
const config = require('./config.json');
const quiverFunctions = require('quiver-functions');
const Login = quiverFunctions.Login;
const RegisterUser = require('./registerUser.js')
const OnCreate = quiverFunctions.OnCreate;
const mocks = quiverFunctions.mocks;
const _ = require('lodash');
var httpMocks = require('node-mocks-http');

admin.initializeApp({
  credential: admin.credential.cert('/Users/Andrew/Documents/webrepos/disciple-exchange-service-account.json'),
  databaseURL: config.firebase.databaseURL
}, 'testApp');

const database = admin.app('testApp').database();
const rootRef = database.ref('test');

const mockUser = {
  uid: 'fake-uid',
  email: 'test@testermail.com',
  password: '1233445',
  displayName: 'And Tester',
  photoURL: '',
  disabled: false,
  emailVerified: false
};

const mockUserRegister = {
  uid: 'fake-uid',
  email: 'test@testermail.com',
  firstName: 'Testy',
  lastName: 'Mctesterson',
  churchPostalCode: '78213'
};

function cleanUp(done) {
  return rootRef.remove().then(done);
}

beforeEach(done => cleanUp(done));
afterAll(done => cleanUp(done));

describe('Login', () => {
  let fakeUser, userRef, loginEvent, loginFunction;

  beforeEach(() => {
    const login = new Login({
      usersPath: '/test/users',
      adminUsers: ['test@testermail.com']
    });
    const loginQueueRef = rootRef.child('/queues/login');

    fakeUser = _.cloneDeep(mockUser);
    userRef = rootRef.child('users').child(fakeUser.uid);
    loginEvent = new mocks.MockDBEvent(loginQueueRef, {
      uid: fakeUser.uid
    }, fakeUser);
    loginFunction = login.getFunction();
  })

  it('should process a user login queue item', done => {
    loginFunction(loginEvent).then(() => userRef.once('value')).then
      (snap => {
        const user = snap.val();
        expect(snap.key).toEqual(fakeUser.uid);
        done();
      })
  })
});


describe('Register User', () => {
  let fakeUser, userRef, registerUserEvent, registerUserEventFunction;
  beforeEach(() => {
    const registerUser = new RegisterUser({
      usersPath: '/test/users'
    });
    const registerUserQueueRef = rootRef.child('/queues/registerUser');

    fakeUser = _.cloneDeep(mockUserRegister);
    userRef = rootRef.child('users').child(fakeUser.uid);
    registerUserEvent = new mocks.MockDBEvent(registerUserQueueRef, {
      uid: fakeUser.uid
    }, fakeUser);
    registerUserEventFunction = registerUser.getFunction();
  })

  it('should process a register user queue item', done => {
    registerUserEventFunction(registerUserEvent).then(() => userRef.once('value')).then
      (snap => {
        const user = snap.val();
        expect(snap.key).toEqual(fakeUser.uid);
        done();
      })
  })
});

describe('Test Hello World Request', () => {
  let hwEvent, hwEventFunction;
  var request = httpMocks.createRequest({
    method: 'GET'
  });

  var response = httpMocks.createResponse();

  beforeEach(() => {
    const hw = new HW();
    hwEventFunction = hw.getFunction();
  })

  it('hitting get request gets hello world', done => {
    // hwEventFunction(request, response).then((dataBody) => {

    // })
    // request.get(baseUrl, function (err, res, body) {
    //   statusCode = res.statusCode;
    //   b = body;
    //   expect(statusCode).toBe(200);
    //   expect(b).toEqual('hello world');
    // })

    response.send = (obj) => {
      expect(obj).toEqual('hello world');
      done();
    };

    myFunctions.hw(request, response)
  })
});