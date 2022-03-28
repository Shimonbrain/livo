import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/home/services/header.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name : string;
  
  constructor(private _headerServ : HeaderService, public _router : Router, private _userServ : UserService) {
     this._headerServ.subject.subscribe(name=>{
       this.name = name
     });
     
    }

   logout(){
     localStorage.removeItem("user")
   }

  ngOnInit(): void {
    this._userServ.getUser().subscribe((result)=>{
      console.log(result);
        document.getElementById("avatarImage").setAttribute("src", "https://bloomia.herokuapp.com/"+result.result.data.profileImage)
    });
    this._headerServ.img.subscribe(img=>{
      console.log(img);
      document.getElementById("avatarImage").setAttribute("src", "https://bloomia.herokuapp.com/"+img)
     });
  }

}
