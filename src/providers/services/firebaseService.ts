import { Injectable, Inject } from '@angular/core';
import 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from 'angularfire2';

@Injectable()
export class FirebaseService {

    public fireAuth: any;
    loginQueue: FirebaseObjectObservable<any>;
    products: FirebaseListObservable<any[]>;
    users: FirebaseObjectObservable<any>;
    db: any;
    public ref: any;

    constructor(
        af: AngularFire,
    ) {
        this.ref = FirebaseRef;
        this.db = af.database;
        this.users = af.database.object('/users');
        this.fireAuth = af.auth;
        this.products = af.database.list('/products');
        this.loginQueue = af.database.object('/queues/current-user')
    }

    userLogin(email, pass) {
        console.log('hello');
        //sdasdasd
        return this.fireAuth.login({ email: email, password: pass });
    }

    getAuth() {
        console.log('in get auth');
        this.fireAuth.subscribe((data) => {
            console.log('in subscribe');
            console.log(data);
        });
    }

    updateUserProfile() {
        console.log('updating user profile');
        // this.fireAuth.subscribe((data) => {
        //     console.log('in subscribe');
        //     console.log(data);
        //     data.updateUserProfile({
        //         displayName: 'Link Notingham',
        //         photoUrl: 'some/url'
        //     });
        // });
        // return this.fireAuth.updateUserProfile({
        //     displayName: 'Link Notingham',
        //     photoUrl: 'some/url'
        // })
    }

    createNewUser(userObj) {
        console.log('creating new user');
        return this.fireAuth.createUser({ email: userObj.email, password: userObj.password })
    }

    userLogout() {
        console.log('log out');
        return this.fireAuth.logout();
    }

    addUser(userResp) {
        var newUserObject = this.db.object('/users/' + userResp.uid);
        return newUserObject.set({
            uid: userResp.uid,
            email: 'test@testermail.com'
        });
    }

    addToRegisterQueue(uid, userObj) {
        var newQueueObject = this.db.object('/queues/register-user/' + uid);
        return newQueueObject.set({
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            churchPostalCode: userObj.churchPostalCode,
            email: userObj.email
        });
    }

    addToLoginQueue(uid, email) {
        var newQueueObject = this.db.object('/queues/current-user/' + uid);
        return newQueueObject.set({
            email: email,
            isAdmin: false
        });
    }

}
