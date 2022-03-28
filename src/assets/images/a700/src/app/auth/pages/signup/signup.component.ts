import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { valueChanges } from 'src/app/helper/formerror.helper';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userRegistration : FormGroup;
  message : string;

  createForm(){
    this.userRegistration = this._fb.group({
      first_name : ["", Validators.required],
      last_name : ["", Validators.required],
      email : ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      contact : [123456789],
      password : ["", [Validators.required, Validators.minLength(6)]]
    }
    )

    this.userRegistration.valueChanges.subscribe(() => {
      this.formErrors = valueChanges(this.userRegistration, {...this.formErrors}, this.formErrorMessages);
    });
  }

  formErrors = {
    first_name: '',
    last_name  : '',
    email: '',
    password: ''
  };

  formErrorMessages = {
    first_name: {
      required: 'First name is Required'
    },
    last_name: {
      required: 'Last name is Required'
    },
    email: {
      required: 'Email is Required',
      pattern: 'Valid email is Required'
    },
    password: {
      required: 'Password is Required',
      minlength: 'Minimum length of password must be 6'
    }
  };


  constructor(private _fb : FormBuilder, private _authService : AuthserviceService, private _router : Router) {
  }

  submit(){
    if (this.userRegistration.invalid) {
      this.userRegistration.markAllAsTouched();
      this.formErrors = valueChanges(this.userRegistration, {...this.formErrors}, this.formErrorMessages);
      return;
    }
    console.log(this.userRegistration.value);

    this._authService.signup(this.userRegistration.value).subscribe((result)=>{
      console.log(result);
      if(result.sucess == true){
        this._router.navigate(["/"])
    }
    }, (err)=>{
      if(err){
        if(err.error == 400){
          this.message = "Email already exists"
        }
        else{
          this.message = "Something went wrong"
        }
      }
    })

  }
  

  ngOnInit(): void {
    this.createForm()
  }



}
