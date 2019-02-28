import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions = true;
  @Input() shoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if (this.shoppingCart && this.shoppingCart.items) {
      const item = this.shoppingCart.items[this.product.key];
      return item ? item.quantity : 0;
    } else {
      return 0;
    }
  }
}
