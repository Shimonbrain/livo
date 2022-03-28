import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from "./components/index.component";
import { A1000Component } from "./components/a1000.component";
import { AutoSmearerComponent } from "./components/auto-smearer.component"
import { HemaStainerComponent } from "./components/hema-stainer.component"
import { DigitalPathologyComponent } from "./components/digital-pathology.component"
import { ContactComponent } from "./components/contact.component";
//import { RoadmapComponent } from "./components/roadmap.component";
import { AboutusComponent } from "./components/about-us.component";
import { CareersComponent } from "./components/careers.component";
import { A700Component } from "./components/a700.component";
import { CartComponent } from "./components/cart.component";
//import { ClientsComponent } from "./components/clients.component";
import { RapidStainComponent } from "./components/rapid-stain.component";
import { CartCheckoutComponent } from "./components/checkout.component";
import { ViewCartComponent } from "./components/view-cart.component";
import { AccountComponent } from "./components/account.component"
import { PrivacyComponent } from "./components/privacy.component"
import { TermsComponent} from "./components/terms.component"
import { CancellationAndReturnsComponent } from "./components/cancellation-and-returns.component"


const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: "A1000", component: A1000Component },
    { path: "A700", component: A700Component },
    { path: "auto-smearer", component: AutoSmearerComponent },
    { path: "hema-stainer", component: HemaStainerComponent },
    { path: "digital-pathology", component: DigitalPathologyComponent },
    { path: "contact-us", component: ContactComponent },
    //{ path: "roadmap", component: RoadmapComponent },
    { path: "about-livo", component: AboutusComponent },
    { path: "careers", component: CareersComponent },
    { path: "cart", component: CartComponent },
    //{ path: "clients", component: ClientsComponent },
    { path: "rapid-stain", component: RapidStainComponent },
    { path: "view-cart", component: ViewCartComponent },
    { path: "cart-checkout", component: CartCheckoutComponent },
    { path: "myaccount", component: AccountComponent },
    { path: "privacy", component: PrivacyComponent },
    { path: "terms-and-conditions", component: TermsComponent},
    { path: "other-policy", component: CancellationAndReturnsComponent }
    //{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    onSameUrlNavigation: 'reload',
    anchorScrolling: 'enabled',
    enableTracing: false,
    relativeLinkResolution: 'legacy'
})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
