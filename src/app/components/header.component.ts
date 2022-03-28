import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {UserService} from '../services/user.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: '../views/header.component.html',
  styleUrls: ['../styles/header.scss']
})

export class HeaderComponent implements OnInit {

  no_of_items = 0;
  is_logged_in: boolean = false;

  constructor(private cartService: CartService, private userService: UserService) {

  }

  showProducts() {
    const element = $('.product-dropdown-header');
    if (element.is(':visible')) {
      $('.product-dropdown-header').slideUp('slow');
    } else {
      $('.product-dropdown-header').slideDown('slow');
    }
  }

  ngOnInit() {
    $('.nav-item a').click(function() {
      if ($(this).attr('aria-haspopup') == undefined && $('.navbar-toggler').is(':visible')) {
        $('#navbarSupportedContent').collapse('toggle');
      }
    });

    this.cartService.currentCartItems.subscribe((items: any) => {
      if (items.length > 0) {
        this.no_of_items = this.totalProducts(items);
      } else if (sessionStorage.getItem('cartItems')) {
        this.no_of_items = this.totalProducts(JSON.parse(sessionStorage.getItem('cartItems')));
      } else {
        this.no_of_items = 0;
      }
    });

    this.userService.currentUser.subscribe((is_logged_in: boolean) => {
      this.is_logged_in = is_logged_in;
    });

    this.is_logged_in = !!localStorage.getItem('currentUser');

  }

  totalProducts(items: any) {
    let total = 0;
    if (items.length > 0) {
      items.filter(item => {
        total += item.quantity;
      });
    }
    return total;
  }

  disableScroll(){
    var headerFixed = document.getElementById("header");
    headerFixed.classList.toggle("preventScroll");
} 

anchorClick(){
  var headerFixed = document.getElementById("header");
  headerFixed.classList.remove("preventScroll");
}
}
