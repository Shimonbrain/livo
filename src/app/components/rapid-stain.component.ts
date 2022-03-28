import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LivoService } from "../services/livo.service";
import { CartService } from "../services/cart.service";
import { Router } from '@angular/router';
import { stain_clients } from "../data/rapid-stain-testimonials"
import { Title, Meta } from '@angular/platform-browser';
import { SEO } from "../../app/data/seo";
import { DOCUMENT } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-rapid-stain',
    templateUrl: '../views/rapid-stain.component.html',
    styleUrls: [
        "../styles/rapid-stain.scss",
        '../styles/global.scss',
    ]
})

export class RapidStainComponent implements OnInit {

    requestForm = "https://docs.google.com/forms/d/e/1FAIpQLSf1aG1Rhuv0aPq5kPShAnpf-BNYY--Ud2JhmvR_SOUwSOJrfQ/viewform?vc=0&c=0&w=1&flr=0&usp=mail_form_link"

    responsiveOptions = [
        {
            breakpoint: '3000px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '768px',
            numVisible: 1,
            numScroll: 1
        }
        ,
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    defaultVolume = "250ml"
    products: any
    product = {
        id: "",
        price: 0,
        mrp: 0,
        volume: "250ml",
        quantity: 1
    }
    isItemsInCart: boolean = false

    cartItems = []
    testimonials: any = stain_clients.testimonials

    constructor(
        private livoService: LivoService,
        private cartService: CartService,
        private router: Router,
        private titleService: Title,
        private metaTagService: Meta,
        private _renderer2: Renderer2,
        @Inject(DOCUMENT) private _document: Document) {

    }

    ngOnInit() {
        this.scrollerBtn();
        this.livoService.storeProducts().then((response: any) => {

            this.products = response.products
            this.product = this.products.filter((product: any) => product.volume == this.defaultVolume)[0]
            this.product.quantity = 1

            if (this.cartItems.length > 0) {
                this.isItemsInCart = true
            }

        });


        //let response = { "products": [{ "id": 31, "price": "2580", "mrp": "3000", "volume": "500ml" }, { "id": 17, "price": "1620", "mrp": "1870", "volume": "250ml" }] };


        this.titleService.setTitle(SEO.rapid_stain.title);

        this.metaTagService.updateTag({ name: "title", content: SEO.rapid_stain.title })
        this.metaTagService.updateTag({ name: "description", content: SEO.rapid_stain.description })
        this.metaTagService.updateTag({ name: "keywords", content: SEO.rapid_stain.keywords })
        this.metaTagService.updateTag({ name: "og:title", content: SEO.rapid_stain.title })
        this.metaTagService.updateTag({ name: "og:site_name", content: SEO.rapid_stain.site_name })
        this.metaTagService.updateTag({ name: "og:url", content: SEO.rapid_stain.url })
        this.metaTagService.updateTag({ name: "og:description", content: SEO.rapid_stain.description })
        this.metaTagService.updateTag({ name: "og:type", content: SEO.rapid_stain.type })
        this.metaTagService.updateTag({ name: "og:image", content: SEO.rapid_stain.image })
        this.metaTagService.updateTag({ name: "twitter:url", content: SEO.rapid_stain.url })
        this.metaTagService.updateTag({ name: "twitter:title", content: SEO.rapid_stain.title })
        this.metaTagService.updateTag({ name: "twitter:description", content: SEO.rapid_stain.description })
        this.metaTagService.updateTag({ name: "twitter:card", content: "summary_large_image" })
        this.metaTagService.updateTag({ name: "twitter:image", content: SEO.rapid_stain.image })


        let script = this._renderer2.createElement('script');
        script.type = `application/ld+json`;
        script.text = SEO.rapid_stain.ld_json;
        let ls = this._document.getElementById("script-ld");
        ls.innerHTML="";
        this._renderer2.appendChild(ls, script);
    }

    addToCartForm = new FormGroup({
        volume: new FormControl("250ml"),
        quantity: new FormControl("1", [Validators.min(1), Validators.max(50), Validators.pattern("[0-9]+")])
    });


    changeVolume(event: Event) {
        let volumeIps: any = document.getElementsByClassName("volumeInput")
        for (var i = 0; i < volumeIps.length; i++) {
            let element = volumeIps[i]
            element.classList.remove("active")
        }

        let labelVolume = (event.target as HTMLLabelElement)
        let inputVolume = document.getElementById(labelVolume.htmlFor) as HTMLInputElement

        this.product = this.products.filter((product: any) => product.volume == inputVolume.value)[0]
        this.product.quantity = 1
        this.addToCartForm.controls.volume.setValue(inputVolume.value)
        this.addToCartForm.controls.quantity.setValue(1)
        labelVolume.classList.add("active")

    }

    addToCart() {
        if (this.product.price != 0) {
            if (this.cartItems.length >= 0) {
                let index = this.cartItems.findIndex((item: any) => item.id == this.product.id)
                if (index > -1) {
                    let item = this.cartItems[index]
                    item.quantity = this.product.quantity
                    // console.log("item", item)
                    this.cartItems[index] = item
                } else {
                    this.cartItems.push(this.product)
                }
            } else {
                this.cartItems = [this.product]
            }
            if (this.cartItems.length > 0) {
                this.isItemsInCart = true
            }
            this.cartService.updateCartItems(this.cartItems)
            sessionStorage.setItem("cartItems", JSON.stringify(this.cartItems))
        }
    }

    decreamentQuantity() {
        let quantityCtl = this.addToCartForm.controls.quantity;
        let val = parseInt(quantityCtl.value)
        if (val > 1) {
            this.addToCartForm.controls.quantity.setValue(val - 1);
            this.product.quantity = val - 1
        }
    }

    increamentQuantity() {
        let quantityCtl = this.addToCartForm.controls.quantity;
        let val = parseInt(quantityCtl.value)
        if (val < 50) {
            this.addToCartForm.controls.quantity.setValue(val + 1);
            this.product.quantity = val + 1
        }
    }

    viewCartItems() {
        this.cartService.updateCartItems(this.cartItems)
        this.router.navigate(['cart-checkout'])
    }

    scrollerBtn() {
        let prevScrollpos = window.pageYOffset;
        window.onscroll = () => {
          const fromTop = window.scrollY + 200;
          const currentScrollPos = window.pageYOffset;
          if (window.pageYOffset > 50) {
            document.getElementById('contact-test').classList.remove('d-none');
            document.getElementById('contact-test1').classList.remove('d-none');
            prevScrollpos = currentScrollPos;
          } else {
            document.getElementById('contact-test').classList.add('d-none');
            document.getElementById('contact-test1').classList.add('d-none');
          }
        };
      }

}
