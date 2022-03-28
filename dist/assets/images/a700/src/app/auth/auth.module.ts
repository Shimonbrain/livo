import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgetComponent } from './pages/forget/forget.component';
import { ResetComponent } from './pages/reset/reset.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgetComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
  
})
export class AuthModule { }
