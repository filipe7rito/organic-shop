import { ShoppinCart } from './shopping-cart';
import { Product } from './product';

export class ShoppinngCartItem {
  key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;

  constructor(init?: Partial<ShoppinngCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
