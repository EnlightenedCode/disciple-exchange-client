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

    addUser(userResp) {
        var newUserObject = this.db.object('/users/' + userResp.uid);
        return newUserObject.set({
            uid: userResp.uid,
            email: 'test@testermail.com'
        });
    }

    addToLoginQueue(uid) {
        var newQueueObject = this.db.object('/queues/current-user/' + uid);
        return newQueueObject.set({
            email: 'andrew@igocki.com',
            isAdmin: false
        });
    }

}
