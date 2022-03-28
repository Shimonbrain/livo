import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from "../services/cart.service";
import { LivoService } from "../services/livo.service";
import { DomSanitizer } from '@angular/platform-browser';
import { topologicalSort } from '@ngxs/store/src/internal/internals';

@Component({
    selector: 'app-cart-checkout',
    templateUrl: '../views/checkout.component.html',
    styleUrls: ["../styles/checkout.scss"]
})


export class CartCheckoutComponent implements OnInit {

    states = [
        "Andhra Pradesh",
        "Andaman and Nicobar Islands",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadar and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ]

    items = []

    isItemsInCart = false
    total = 0
    spinning = false
    newUser = true
    GST = 0

    addToCart = this.fb.group({
        items: this.fb.array([])
    });

    checkoutCart = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
        billing_firstname: ["", Validators.required],
        billing_lastname: ["", Validators.required],
        billing_address_1: ["", Validators.required],
        billing_address_2: ["", Validators.required],
        billing_country: ["", Validators.required],
        billing_city: ["", Validators.required],
        billing_state: ["", Validators.required],
        billing_email: ["", [Validators.required, Validators.email]],
        billing_phone: ["", Validators.required],
        billing_postcode: ["", [Validators.required, Validators.pattern('[0-9]*')]],
        billing_company: [""],
        useraccount: ["new", [Validators.required]],
        ship_to_different_address: [false],
        shipping_firstname: ["", Validators.required],
        shipping_lastname: ["", Validators.required],
        shipping_company: [""],
        shipping_address_1: ["", Validators.required],
        shipping_address_2: ["", Validators.required],
        shipping_country: ["", Validators.required],
        shipping_city: ["", Validators.required],
        shipping_state: ["", Validators.required],
        shipping_postcode: ["", [Validators.required, Validators.pattern('[0-9]*')]]
    })

    loginForm = this.fb.group({
        login_email: ["", [Validators.required, Validators.email]],
        login_password: ["", Validators.required]
    })

    cartControls = this.checkoutCart.controls
    loginControls = this.loginForm.controls

    submitted = false
    disabled = false
    signsubmitted = false

    _cartItems = this.fb.array([])

    orderResponse: any
    checkoutCartFormValid = false;
    loginErrors: boolean = false;
    loginErrorMessage: any;
    customer: any;
    checkoutErrors: boolean = false;
    checkoutErrorMessage: any;
    showCheckout: boolean = true;
    rzp1: any;

    constructor(private router: Router, private fb: FormBuilder, private cartService: CartService, private livoService: LivoService, private sanitizer: DomSanitizer, private cdf: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.checkoutCart.statusChanges.subscribe((status: any) => {
            if (status == "VALID") {
                this.checkoutCartFormValid = true
            } else {
                this.checkoutCartFormValid = false
            }
            if (this.customer) {
                this.checkoutCartFormValid = true
            }
        })

        this.cartService.currentCartItems.subscribe((items: any) => {
            this.items = items
        });

        if (this.items.length == 0) {
            let sessionStoreItems = JSON.parse(sessionStorage.getItem("cartItems"))
            this.isItemsInCart = false
            if (sessionStoreItems && sessionStoreItems.length > 0) {

                this.items = sessionStoreItems
            } else {
                this.router.navigate(["rapid-stain"])
            }
        }

        if (this.items.length > 0) {
            this.isItemsInCart = true
            this.items.forEach((item: any) => {

                let cartForm = this.fb.group({
                    store_product_id: [item.id],
                    volume: [{ value: item.volume, disabled: true }],
                    price: [{ value: item.price, disabled: true }],
                    quantity: [item.quantity, [Validators.required, Validators.min(1), Validators.max(50)]],
                    mrp: [{ value: item.mrp, disabled: true }]
                });

                this._cartItems.push(cartForm)
                this.total += (item.price * item.quantity)
            });
            this.GST = this.total * 12 / 100
            this.total += this.GST
            this.addToCart.controls.items = this._cartItems;
            sessionStorage.setItem("cartItems", JSON.stringify(this.items))
        }

        this.addToCart.get("items").valueChanges.subscribe((items: any) => {
            this.total = 0
            if (items.length == 0) {
                this.isItemsInCart = false
            } else {
                items.forEach((item: any, index: any) => {
                    this.items[index].quantity = item.quantity
                    this.total += (this._cartItems.controls[index].get("price").value * item.quantity)
                });
                this.GST = this.total * 12 / 100
                this.total += this.GST
                sessionStorage.setItem("cartItems", JSON.stringify(this.items))
            }
        });

        if (!this.checkoutCart.get('ship_to_different_address').value) {
            this.clearShippingValidation()
        }
        this.checkoutCart.get('ship_to_different_address').valueChanges.subscribe(value => {
            if (value) {
                this.setShippingValidation()
            } else {
                this.clearShippingValidation()
            }
        });
        if (localStorage.getItem("currentUser")) {
            let customerData = JSON.parse(localStorage.getItem("currentUser"))
            this.customer = customerData.customer
            this.checkoutCartFormValid = true
            this.checkoutCart.controls.useraccount.setValue("existing")
            this.newUser = false
        }
    }

    private setShippingValidation() {
        this.checkoutCart.get('shipping_firstname').setValidators([Validators.required])
        this.checkoutCart.get('shipping_lastname').setValidators([Validators.required])
        this.checkoutCart.get('shipping_address_1').setValidators([Validators.required])
        this.checkoutCart.get('shipping_address_2').setValidators([Validators.required])
        this.checkoutCart.get('shipping_country').setValidators([Validators.required])
        this.checkoutCart.get('shipping_city').setValidators([Validators.required])
        this.checkoutCart.get('shipping_state').setValidators([Validators.required])
        this.checkoutCart.get('shipping_postcode').setValidators([Validators.required, Validators.pattern('[0-9]*')])
        this.checkoutCart.get("shipping_firstname").updateValueAndValidity()
    }

    private clearShippingValidation() {
        this.checkoutCart.get('shipping_firstname').clearValidators();
        this.checkoutCart.get('shipping_lastname').clearValidators();
        this.checkoutCart.get('shipping_address_1').clearValidators();
        this.checkoutCart.get('shipping_address_2').clearValidators();
        this.checkoutCart.get('shipping_country').clearValidators();
        this.checkoutCart.get('shipping_city').clearValidators();
        this.checkoutCart.get('shipping_state').clearValidators();
        this.checkoutCart.get('shipping_postcode').clearValidators();
        this.checkoutCart.get("shipping_firstname").updateValueAndValidity()
    }

    changeShipping(event: Event) {
        if ((event.target as HTMLInputElement).checked) {
            document.getElementById("shippingForm").classList.add("show")
        } else {
            document.getElementById("shippingForm").classList.remove("show")
        }
    }

    removeCartItem(index: number) {
        this._cartItems.removeAt(index)
        this.addToCart.controls.items = this._cartItems
        this.items.splice(index, 1)
        sessionStorage.setItem("cartItems", JSON.stringify(this.items))
        this.cartService.updateCartItems(this.items)
        if (this.items.length == 0) {
            this.router.navigate(["rapid-stain"])
        }
    }

    changeUserAccount(event: any) {
        if (event.target.value == "existing") {
            this.newUser = false
            this.checkoutCart.reset()
            if (this.customer) {
                this.showCheckout = true
            } else {
                this.showCheckout = false
            }
        } else {
            this.loginForm.reset()
            this.newUser = true
            this.showCheckout = true
        }
    }

    itemsTotal() {
        return parseFloat(this.total + "").toFixed(2)
    }
    gstValue() {
        return parseFloat(this.GST + "").toFixed(2)
    }

    private buildOrderParams() {
        let checkoutParams = {
            orders: {
                billing: {
                    first_name: this.checkoutCart.value.billing_firstname,
                    last_name: this.checkoutCart.value.billing_lastname,
                    address_1: this.checkoutCart.value.billing_address_1,
                    address_2: this.checkoutCart.value.billing_address_2,
                    country: this.checkoutCart.value.billing_country,
                    city: this.checkoutCart.value.billing_city,
                    state: this.checkoutCart.value.billing_state,
                    postcode: this.checkoutCart.value.billing_postcode,
                    email: this.checkoutCart.value.billing_email,
                    phone: this.checkoutCart.value.billing_phone
                },
                shipping: {},
                line_items: this._cartItems.value
            }
        }
        if (this.checkoutCart.value.useraccount == "new") {
            checkoutParams.orders["createaccount"] = true
            checkoutParams.orders["username"] = this.checkoutCart.value.username
            checkoutParams.orders["password"] = this.checkoutCart.value.password
        } else {
            checkoutParams.orders["createaccount"] = false
            delete checkoutParams.orders["username"]
            delete checkoutParams.orders["password"]
        }

        if (this.checkoutCart.value.billing_company != "") {
            checkoutParams.orders.billing["company"] = this.checkoutCart.value.billing_company
        }

        if (this.checkoutCart.value.ship_to_different_address) {
            checkoutParams.orders["shipping"] = {
                first_name: this.checkoutCart.value.shipping_firstname,
                last_name: this.checkoutCart.value.shipping_lastname,
                address_1: this.checkoutCart.value.shipping_address_1,
                address_2: this.checkoutCart.value.shipping_address_2,
                country: this.checkoutCart.value.shipping_country,
                city: this.checkoutCart.value.shipping_city,
                state: this.checkoutCart.value.shipping_state,
                postcode: this.checkoutCart.value.shipping_postcode,
            }
        } else {
            checkoutParams.orders.shipping = checkoutParams.orders.billing
        }

        if (this.checkoutCart.value.shipping_company != "") {
            checkoutParams.orders.shipping["company"] = this.checkoutCart.value.billing_company
        }
        return checkoutParams;
    }

    buildOrderParamsFromCustomer() {
        let params = { orders: {} }
        if (this.customer) {
            params.orders = {
                line_items: this._cartItems.value,
                billing: this.customer.billing,
                shipping: this.customer.shipping
            }
            //params.orders["customer_id"] = this.customer.id
        }
        return params
    }

    private orderItems(params) {
        let that = this
        let service
        console.log('sending ', params)
        if (this.checkoutCart.value.useraccount == "existing") {
            service = this.livoService.placeOrder(params, true)
        } else {
            service = this.livoService.placeOrder(params, false)
        }
        service.then((response: any) => {
            console.log(response, "Response")
            if (response.status == "success") {
                this.submitted = false;
                this.cartService.updateCartItems([]);
                this.orderResponse = response

                response.order['handler'] = this.paymentSuccess.bind(this)
                /*response.order['handler'] = function (successResponse) {
                    console.log("Success Response", successResponse)
                    localStorage.setItem("payment", JSON.stringify(successResponse))
                }*/
                response.order['name'] = 'Radoratory Technologies Pvt. Ltd'
                response.order['description'] = 'Payment'

                response.order["modal"] = {
                    "ondismiss": function () {
                        console.log("Dialog Close");
                        that.router.navigate(["myaccount"]).then(()=>{
                            window.location.reload();
                        })
                        this.spinning = false;
                        this.disabled = false;
                    }
                }

                this.rzp1 = new Razorpay(response.order);
                this.rzp1.on('payment.failed', function (failureResponse) {
                    console.log("Failure Response", failureResponse)
                    localStorage.setItem("payment_failure", JSON.stringify(failureResponse))
                });
                this.rzp1.open();

                this.checkoutCart.reset();
                this.items = []
                sessionStorage.removeItem("cartItems")
            } else if (response.status == "failure") {
                this.checkoutErrors = true
                if (response.message) {
                    this.checkoutErrorMessage = response.message
                } else {
                    this.checkoutErrorMessage = response.errors
                }
            }
        })

    }

    paymentSuccess(response: any) {
        console.log("Success Response", response)
        localStorage.setItem("payment", JSON.stringify(response))
        this.rzp1.close();
        this.router.navigate(["myaccount"]).then(()=>{
            window.location.reload();
        })
    }

    signin() {
        this.signsubmitted = true
        if (this.loginForm.valid) {
            let loginParams = {
                email: this.loginForm.value.login_email,
                password: this.loginForm.value.login_password
            }
            this.livoService.signin(loginParams).then((response: any) => {
                if (response.code) {
                    this.loginErrors = true
                    this.loginErrorMessage = this.sanitizer.bypassSecurityTrustHtml(response.message)
                } else if (response.status == "success") {
                    this.loginErrors = false
                    this.loginErrorMessage = ""
                    this.customer = response.customer
                    this.showCheckout = true
                    localStorage.setItem("currentUser", JSON.stringify(response))
                    this.cdf.detectChanges();
                }
            })
        } else {
            return;
        }
    }

    placeAnOrder() {
        this.spinning = true
        this.disabled = true
        let checkoutParams = {}
        if (this.checkoutCart.value.useraccount == "new") {
            if (this.checkoutCart.valid) {
                checkoutParams = this.buildOrderParams();
                this.orderItems(checkoutParams)
            } else {
                this.submitted = true
                this.spinning = false
                this.disabled = false
            }
        } else if (this.checkoutCart.value.useraccount == "existing") {
            console.log("Exisitng", this.customer)
            if (this.customer) {
                checkoutParams = this.buildOrderParamsFromCustomer();
                this.orderItems(checkoutParams)
            } else {
                if (this.loginForm.valid) {
                    this.disabled = false
                    this.spinning = false
                } else {
                    this.spinning = false
                    this.disabled = false
                    this.signsubmitted = true
                }
            }
        }


        /*if (this.checkoutCart.valid) {
            let checkoutParams = {}
            if (this.checkoutCart.value.useraccount == "new") {
                checkoutParams = this.buildOrderParams();
            } else {
                checkoutParams = this.buildOrderParamsFromCustomer();
            }
            console.log(checkoutParams)
            this.orderItems(checkoutParams)

        } else {
            this.spinning = false
            this.disabled = false
            let checkoutParams = {}
            if (this.checkoutCart.value.useraccount == "existing") {
                if (this.customer) {
                    checkoutParams = this.buildOrderParamsFromCustomer();
                    console.log(checkoutParams)
                    this.orderItems(checkoutParams)
                }
            }
        }*/
    }
}
