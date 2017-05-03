'user strict';
const admin = require('firebase-admin');
const config = require('./config.json');
const quiverFunctions = require('quiver-functions');
const Login = quiverFunctions.Login;
const OnCreate = quiverFunctions.OnCreate;
const mocks = quiverFunctions.mocks;
const _ = require('lodash');

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
  databaseURL: config.firebase.databaseURL
});

const database = admin.database();
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