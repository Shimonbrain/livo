import { StateActions } from './ngxs-store/StateActions';
import { BrowserModule, disableDebugTools } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header.component";
import { FooterComponent } from "./components/footer.component";
import { IndexComponent } from "./components/index.component";
import { AutoSmearerComponent } from "./components/auto-smearer.component";
import { HemaStainerComponent } from "./components/hema-stainer.component";
import { DigitalPathologyComponent } from "./components/digital-pathology.component";
import { DigitalRadiologyComponent } from "./components/digital-radiology.component";
import { DistributorsComponent } from "./components/distributors.component";
import { ContactComponent } from "./components/contact.component";
import { RoadmapComponent } from "./components/roadmap.component";
import { TeamsComponent } from "./components/teams.component";
import { AboutusComponent } from "./components/about-us.component";
import { CareersComponent } from "./components/careers.component";
import { A700Component } from "./components/a700.component";
import { A1000Component } from "./components/a1000.component";
import { ContactSalesComponent } from "./components/contact-sales.component";
import { WidgetStepsComponent } from "./components/widget.steps.component";
import { CartComponent } from "./components/cart.component"
import { CollapseStepsComponent } from "./components/collapse.steps.component";
import { ClientsImageComponent } from "./components/clients-image.component";
import { ClientsComponent } from "./components/clients.component";
import { RapidStainComponent } from "./components/rapid-stain.component";
import { CartCheckoutComponent } from "./components/checkout.component";
import { ViewCartComponent } from "./components/view-cart.component";

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { RapidStainClientsComponent } from "./components/rapid-statin-clients.component"
import { AccountComponent } from "./components/account.component"

import { LivoService } from "./services/livo.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from "@angular/material/sort"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { LoginDialog } from './components/signin.component'

import { PrivacyComponent } from "./components/privacy.component"
import { TermsComponent} from "./components/terms.component"
import { CancellationAndReturnsComponent } from "./components/cancellation-and-returns.component"
import {CarouselModule} from 'primeng/carousel'
import { NgxsModule } from '@ngxs/store'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'

/*import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
    return player;
}*/

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        IndexComponent,
        AutoSmearerComponent,
        HemaStainerComponent,
        DigitalPathologyComponent,
        DigitalRadiologyComponent,
        DistributorsComponent,
        ContactComponent,
        RoadmapComponent,
        TeamsComponent,
        AboutusComponent,
        CareersComponent,
        A700Component,
        A1000Component,
        ContactSalesComponent,
        WidgetStepsComponent,
        CartComponent,
        CollapseStepsComponent,
        ClientsComponent,
        ClientsImageComponent,
        RapidStainComponent,
        RapidStainClientsComponent,
        CartCheckoutComponent,
        ViewCartComponent,
        AccountComponent,
        LoginDialog,
        PrivacyComponent,
        TermsComponent,
        CancellationAndReturnsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxBootstrapIconsModule.pick(allIcons),
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatDialogModule,
        CarouselModule,
        NgxsModule.forRoot([StateActions]),
        NgxsStoragePluginModule.forRoot(
          {
            key: 'State'
          }
        ),
        NgxsReduxDevtoolsPluginModule.forRoot(
          {
            disabled: false
          }
        ),
    ],
    providers: [LivoService],
    bootstrap: [AppComponent],
    entryComponents: [LoginDialog]
})
export class AppModule { }
