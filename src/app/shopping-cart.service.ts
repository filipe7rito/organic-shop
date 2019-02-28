import { query } from '@angular/core/src/render3/query';
import { take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<String> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  getItem(cartId: String, productId: String) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const items$ = this.getItem(cartId, product.key).valueChanges();

    items$.pipe(take(1)).subscribe((item: any) => {
      const item_ = this.getItem(cartId, product.key);
      item_.update({
        product: product,
        quantity: (item ? item.quantity : 0) + 1
      });
    });
  }
}
