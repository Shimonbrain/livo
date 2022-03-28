import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LivoService } from '../services/livo.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderData } from '../interface/order'
import { QueryParamsModel } from '../tables/models/query-models/query-params.model';
import { OrderDataSource } from "../tables/order.datasource"
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSpinner } from '@angular/material/progress-spinner'
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from "./signin.component"
import { UserService } from "../services/user.service";
import { environment } from "../../environments/environment";
import { Store } from '@ngxs/store';
import { LoginUser, LogoutUser } from '../ngxs-store/Store-Classes';

@Component({
    selector: 'app-my-accoint',
    templateUrl: '../views/account.component.html',
    styleUrls: ["../styles/account.scss"],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
    ]
})

export class AccountComponent implements OnInit, AfterViewInit {
    customer: any;
    order_status: string;
    payment: any;

    currentUser: any;

    orderColumns = ["order_id", "created_at", "status", "amount", "actions"]
    columnsToDisplay = {
        order_id: "Order ID",
        created_at: "Date",
        status: "Status",
        amount: "Total",
        actions: ""
    }
    expandedElement: OrderData | null;


    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSpinner, { static: false }) spinner: MatSpinner;

    is_logged_in: boolean = false;
    submitted: boolean = false
    loginErrors: boolean = false
    loginErrorMessage: any
    loginForm: FormGroup;

    orderSource: OrderDataSource;

    constructor(private router: Router,
        private livoService: LivoService,
        private userService: UserService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        private store: Store) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        })

        this.userService.currentUser.subscribe((response: any) => {
            this.is_logged_in = response
            if (response) {
                this.orderSource = new OrderDataSource(this.livoService);
                if (this.customer == null || this.customer.customer == undefined) {
                    this.customer = JSON.parse(localStorage.getItem("currentUser"))
                    this.order_status = localStorage.getItem("order_status")
                    this.payment = localStorage.getItem("payment")

                    if (this.customer) {
                        this.currentUser = this.customer.customer
                    }
                }
                setTimeout(()=>{
                    this.renderOrders()
                }, 500)
            }
        })
    }

    get loginControls() { return this.loginForm.controls }

    ngOnInit() {
        this.customer = JSON.parse(localStorage.getItem("currentUser"))
        this.order_status = localStorage.getItem("order_status")
        this.payment = localStorage.getItem("payment")

        if (this.customer) {
            this.currentUser = this.customer.customer
            this.is_logged_in = true
            this.orderSource = new OrderDataSource(this.livoService);

        } else {
            this.is_logged_in = false
        }

        if (this.payment) {
            setTimeout(() => {
                localStorage.setItem("payment", "")
            }, 10000);
        }
    }

    ngAfterViewInit(){
        this.renderOrders()
    }

    renderOrders(){
        if(this.paginator){
            this.paginator.page.pipe(
                tap(() => {
                    this.getOrders(false)
                })
            ).subscribe();
            this.getOrders(true);
        }
    }


    getOrders(firstTimeToLoad: boolean) {
        if (this.customer) {
            const queryParams = new QueryParamsModel({},
                this.paginator.pageIndex,
                firstTimeToLoad ? 10 : this.paginator.pageSize
            );
            this.orderSource.loadOrders(queryParams)
        }
    }

    loginDialog() {
        const dialogRef = this.dialog.open(LoginDialog, {
            height: '400px',
            width: '600px',
            disableClose: true,
            autoFocus: false,
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            this.customer = response.currentUser
            this.currentUser = response.currentUser.customer
            this.getOrders(true)
            this.userService.set(true)
        });
    }

    signin() {
        this.submitted = true
        if (this.loginForm.valid) {
            let loginParams = {
                email: this.loginForm.value.email,
                password: this.loginForm.value.password
            }
            this.livoService.signin(loginParams).then((response: any) => {
                if (response.status == "failure") {
                    this.loginErrors = true
                    this.loginErrorMessage = response.message
                } else if (response.status == "success") {
                    this.loginErrors = false
                    this.loginErrorMessage = ""
                    localStorage.setItem("currentUser", JSON.stringify(response))
                    this.store.dispatch(new LoginUser(response));
                    this.userService.set(true)
                }
            }).catch((reason: any) => {
                this.loginErrors = true
                this.loginErrorMessage = reason.error.user
            })
        } else {
            return false;
        }
    }

    logout() {
      this.store.dispatch(new LogoutUser());

        this.is_logged_in = false;
        this.customer = {}
        this.currentUser = {}
        this.userService.set(false)
        localStorage.removeItem('currentUser')
        localStorage.removeItem('order_status')
    }

    onPayment(order: any) {
        console.log('order info ', order)
        let options = {
            "key": environment.razorpay_key_id, // Enter the Key ID generated from the Dashboard
            "amount": order.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": 'Radoratory Technologies Pvt. Ltd',
            "description": "Payment",
            "order_id": order.razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": this.paymentSuccess.bind(this),
            "prefill": {
                "name": order.first_name + " " + order.last_name,
                "email": order.email,
                "contact": order.phone
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (failureResponse) {
            console.log("Failure Response", failureResponse)
            localStorage.setItem("payment_failure", JSON.stringify(failureResponse))
        });
        rzp1.open();
    }

    paymentSuccess(response: any) {
        //alert('Payment done successfully.!')
        localStorage.setItem("payment", JSON.stringify(response))
        this.getOrders(false);
    }

    cancelOrder(order: any) {
        let order_id = order.id

        if (confirm("Would you really like to cancel the order?")) {
            let isRefund: boolean = false;
            if (order.status == 'captured') {
                isRefund = true;
            }
            this.livoService.cancelOrder(order_id, isRefund).then((response: any) => {
                if (response.status == 'success') {
                    //alert('Order cancelled successfully.!')
                    this.getOrders(false)
                } else {
                    alert('Error occured. Please try again later.')
                }
            });
        }
    }
}
