import { LoginUser } from './../ngxs-store/Store-Classes';
import { LoginForm, AppStateI } from './../ngxs-store/Interfaces';
import { State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrdersApi } from '../interface/order';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"
import { Store } from '@ngxs/store';

const API_URL = environment.API_URL

@Injectable()
export class LivoService {

    constructor(private http: HttpClient, private store: Store) { }

    withoutJWT() {
        return new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
    }

    withJWT() {

        const token = this.store.selectSnapshot<any>((state: any) => state.State.token.auth_token);
        let currentUser = JSON.parse(localStorage.getItem("currentUser"))
        if (currentUser) {
            return new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
        } else {
            return new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
        }
    }

    storeProducts() {
        return this.http.get(`${API_URL}store/products.json`, { headers: this.withoutJWT() }).toPromise();
    }

    placeOrder(orders: any, withJWT: boolean) {
        let headers: HttpHeaders
        if(withJWT){
            headers = this.withJWT()
        } else {
            headers = this.withoutJWT()
        }
        return this.http.post(`${API_URL}store/orders.json`, orders, { headers: headers }).toPromise();
    }

    signin(params: any) {
        return this.http.post(`${API_URL}store/authenticate.json`, params, { headers: this.withoutJWT() }).toPromise();
    }

    cancelOrder(id: number, isRefund: boolean) {
        let body = { 'isRefund': isRefund }
        return this.http.put(`${API_URL}store/orders/${id}.json`, body, { headers: this.withoutJWT() }).toPromise();
    }

    getOrders(params: any, pageIndex: number): Observable<OrdersApi> {
        let headers = this.withJWT()
        params.page = pageIndex
        return this.http.get<OrdersApi>(`${API_URL}store/orders.json?page=${pageIndex}`, { headers: headers })
    }

    verifySignature(params: any) {
        return this.http.post(`${API_URL}payments/update_signature.json`, params, { headers: this.withoutJWT() }).toPromise();
    }
}
