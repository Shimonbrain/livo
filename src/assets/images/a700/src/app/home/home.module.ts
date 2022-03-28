import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ImageCropperModule } from 'ngx-image-cropper';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './shared/header/header.component';
import { VideoComponent } from './shared/video/video.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    VideoComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    ImageCropperModule
  ],
  providers : [
    ]
})
export class HomeModule { }
