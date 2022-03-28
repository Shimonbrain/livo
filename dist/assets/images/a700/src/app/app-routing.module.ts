import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : "",
    loadChildren : ()=>import("./auth/auth.module").then(m1=>m1.AuthModule)
  },
  {
    path : "home",
    loadChildren : ()=>import("./home/home.module").then(m2=>m2.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
