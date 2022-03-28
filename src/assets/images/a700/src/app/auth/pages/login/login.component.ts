import { Component, OnInit } from '@angular/core';
import { valueChanges } from 'src/app/helper/formerror.helper';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin : FormGroup;
  message : string;

  createForm(){
    this.userLogin = this._fb.group({
      email : ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password : ["", [Validators.required, Validators.minLength(6)]]
    }
    )

    this.userLogin.valueChanges.subscribe(() => {
      this.formErrors = valueChanges(this.userLogin, {...this.formErrors}, this.formErrorMessages);
    });
  }

  formErrors = {
    email: '',
    password: ''
  };

  formErrorMessages = {
    email: {
      required: 'Email is Required',
      pattern: 'Valid email is required'
    },
    password: {
      required: 'Password is Required',
      minlength: 'Minimum length of password must be 6'
    }
  };

  constructor(private _fb : FormBuilder, private _authService : AuthserviceService, private _router : Router,
    private _cookieServ : CookieService) { }

  submit(){
    if (this.userLogin.invalid) {
      this.userLogin.markAllAsTouched();
      this.formErrors = valueChanges(this.userLogin, {...this.formErrors}, this.formErrorMessages);
      return;
    }
    console.log(this.userLogin.value);

    this._authService.login(this.userLogin.value).subscribe((result)=>{
      console.log(result.result.sucess)
        if(result.result.sucess == true)
        {
          localStorage.setItem("user", result.result.token)
        
          this._router.navigate(["/home"])
      }else if(result.result.status == 401){
        this.message = result.result.message
    }else if(result.result.status == 404){
      this.message = result.result.message
    }else if(result.result.status == 403){
      this.message = result.result.message
    }
    else{
      this.message = "Something went wrong"
    }
  },(err)=>{
    
    if(err.result.status == 401){
        this.message = err.message
    }else if(err.result.status == 404){
      console.log("yes");
      this.message = err.message
    }
    else{
      this.message = "Something went wrong"
    }
  })
}

  ngOnInit(): void {
    this.createForm()
  }

}
