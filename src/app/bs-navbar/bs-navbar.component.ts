import { Observable } from 'rxjs';
import { ShoppinCart } from './../models/shopping-cart';
import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppinCart>;

  constructor(
    private auth: AuthService,
    private shoppingCart: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });

    this.cart$ = await this.shoppingCart.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
