import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private isLoggedIn = new BehaviorSubject(false);
    currentUser = this.isLoggedIn.asObservable();

    constructor() {

    }

    set(is_logged_in: boolean) {
        this.isLoggedIn.next(is_logged_in)
    }
}