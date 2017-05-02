import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {

    public fireAuth: any;
    products: FirebaseListObservable<any[]>;

    constructor(
        af: AngularFire
    ) {
        this.fireAuth = af.auth;
        this.products = af.database.list('/products');
    }

    userLogin(email, pass) {
        console.log('hello');
        //sdasdasd
        return this.fireAuth.login({ email: email, password: pass });
    }

}
