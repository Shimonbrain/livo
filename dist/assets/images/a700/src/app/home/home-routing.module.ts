import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path : "",
    component : HomeComponent,
    children : [
      {
        path : "",
        canActivate : [AuthGuard],
        component : ConfigurationComponent
      },
      {
        path : "profile",
        canActivate : [AuthGuard],
        component : ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
