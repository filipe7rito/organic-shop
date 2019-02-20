import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map(items => {
          // <== new way of chaining
          return items.map(a => {
            const title = a.payload.val()['title'];
            const price = a.payload.val()['price'];
            const category = a.payload.val()['category'];
            const imageUrl = a.payload.val()['imageUrl'];
            const key = a.payload.key;
            return { key, title, price, category, imageUrl }; // or {key, ...data} in case data is Obj
          });
        })
      );
  }

  get(productId) {
    console.log(productId);
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    this.db.object('/products/' + productId).remove();
  }
}
