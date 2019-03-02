import { Product } from './product';
import { ShoppinngCartItem } from './shopping-cart-item';
import { format } from 'util';

export class ShoppinCart {
  items: ShoppinngCartItem[] = [];
  constructor(public itemsMap: { [key: string]: ShoppinngCartItem }) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      const item = itemsMap[productId];

      this.items.push(
        new ShoppinngCartItem({
          ...item,
          key: productId
        })
      );
    }
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.itemsMap) {
      if (this.itemsMap[productId].hasOwnProperty('quantity')) {
        count += this.itemsMap[productId].quantity;
      }
    }
    return count;
  }
}
