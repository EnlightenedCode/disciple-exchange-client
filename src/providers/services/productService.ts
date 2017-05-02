import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ProductService {

  public fireAuth: any;
  products: FirebaseListObservable<any[]>;

  constructor(
    af: AngularFire
  ) {
    this.products = af.database.list('/products');
  }

  getProducts() {
    return this.products
  }

}
