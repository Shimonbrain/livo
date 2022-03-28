import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

  export class AfterLogin implements CanActivate {
  
    constructor(private _router : Router){}
  
    canActivate(){
      if(!localStorage.getItem("user")){
        return true;
      }
      else{
        this._router.navigate(["/home"]);
        return false;
      }
    }
    
  }
