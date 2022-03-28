import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    private cartItems = new BehaviorSubject([]);
    currentCartItems = this.cartItems.asObservable();

    constructor() {

    }

    updateCartItems(message: any) {
        this.cartItems.next(message)
    }
}