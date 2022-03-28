import { Injectable } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpServices : HttpserviceService) { }

  getUser(){
    return this._httpServices.get(environment.serverUrl+'users/getUser');
  }
  profileUpdate(obj){
    return this._httpServices.update(environment.serverUrl+'users/updateProfile', obj);
  }
  changePassword(obj){
    return this._httpServices.update(environment.serverUrl+'users/updatePassword', obj);
  }
  imageUpload(obj){
    return this._httpServices.update(environment.serverUrl+'users/upload', obj);
  }
}
