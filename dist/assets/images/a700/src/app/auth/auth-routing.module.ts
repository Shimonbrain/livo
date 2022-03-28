import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgetComponent } from './pages/forget/forget.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetComponent } from './pages/reset/reset.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AfterLogin } from 'src/app/guards/afterlogin.guard';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children : [
      {
        path : "",
        canActivate : [AfterLogin],
        component : LoginComponent
      },
      {
        path : "signup",
        canActivate : [AfterLogin],
        component : SignupComponent
      },
      {
        path : "forget",
        canActivate : [AfterLogin],
        component : ForgetComponent
      },
      {
        path : "Resetpassword/:id",
        canActivate : [AfterLogin],
        component : ResetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
