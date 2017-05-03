'user strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const quiverFunctions = require('quiver-functions');
const OnCreate = quiverFunctions.OnCreate;
const Login = quiverFunctions.Login;

const config = functions.config();
admin.initializeApp(config.firebase);

const onCreate = new OnCreate({
  usersPath: 'users',
  database: admin.database()
})
exports.onCreate = functions.auth.user().onCreate(onCreate.getFunction());

const login = new Login({
  usersPath: 'users',
  adminUsers: ['andrew@igocki.com']
});

exports.login = functions.database.ref('queues/current-user/{uid}').onWrite(login.getFunction());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
