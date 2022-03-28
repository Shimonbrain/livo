import { LoginUser } from '../ngxs-store/Store-Classes';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LivoService } from '../services/livo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-login-dialog',
    styleUrls: ["../styles/login.scss"],
    templateUrl: '../views/login-dialog.html',
})


export class LoginDialog {

    submitted: boolean = false
    loginErrors: boolean = false
    loginErrorMessage: any
    loginForm: FormGroup;



    constructor(private fb: FormBuilder, private livoService: LivoService,
        private dialogRef: MatDialogRef<LoginDialog>,  private store: Store) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        })

    }

    get loginControls() { return this.loginForm.controls }

    signin() {
        this.submitted = true
        if (this.loginForm.valid) {
            let loginParams = {
                email: this.loginForm.value.email,
                password: this.loginForm.value.password
            }
            this.livoService.signin(loginParams).then((response: any) => {
                console.log("Response", response)
                if (response.code) {
                    this.loginErrors = true
                    this.loginErrorMessage = response.message
                } else if (response.status == "success") {
                    this.loginErrors = false
                    this.loginErrorMessage = ""
                    localStorage.setItem("currentUser", JSON.stringify(response.user))
                    this.closeDialog()
                }
            }).catch((reason: any) =>{
                this.loginErrors = true
                console.log(reason)
                this.loginErrorMessage = reason.error.user
            })
        } else {
            return;
        }
    }

    closeDialog() {
        this.dialogRef.close({
            currentUser: JSON.parse(localStorage.getItem("currentUser"))
        });
    }

}
