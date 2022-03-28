import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private _router : Router){}

  canActivate(){
    var token = localStorage.getItem("user");
    if(token){
      return true;
    }
    else{
      this._router.navigate(["/"]);
      return false;
    }
  }
  
}

// export class AfterLogin implements CanActivate {

//   constructor(private _router : Router){}

//   canActivate(){
//     if(!localStorage.getItem("user")){
//       return true;
//     }
//     else{
//       this._router.navigate(["/home"]);
//       return false;
//     }
//   }
  
// }
