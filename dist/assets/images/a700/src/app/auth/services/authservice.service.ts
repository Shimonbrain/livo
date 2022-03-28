import { Injectable } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private _httpServices: HttpserviceService) { }
  
  login(obj){
    return this._httpServices.post(environment.serverUrl+'users/login', obj);
  }
  signup(obj){
    return this._httpServices.post(environment.serverUrl+'users/signup', obj);
  }
  forgotPassword(obj){
    return this._httpServices.update(environment.serverUrl+'users/forgetPassword', obj);
  }
  resetPassword(obj){
    return this._httpServices.update(environment.serverUrl+'users/resetPassword', obj);
  }
}

