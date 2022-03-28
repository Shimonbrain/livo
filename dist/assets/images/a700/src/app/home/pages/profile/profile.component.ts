import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { valueChanges, passwordValidation, passNotSame } from 'src/app/helper/formerror.helper';
import { HeaderService } from 'src/app/home/services/header.service';
import { UserService } from 'src/app/home/services/user.service';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public inactive:boolean = true;
  public isValid:boolean = true;

  userInfo : FormGroup
  passwordForm : FormGroup
  success : String;
  error : String;
  imageUploaded = false;
  imageVisible = false;
  showCropped = false;
  finalFile;
  imageRemoved = false;
  
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  createForm(){
    this.userInfo = this._fb.group({
      first_name : ["", Validators.required],
      last_name : ["", Validators.required],
      email : [""],
      contact : [null, [Validators.required, Validators.minLength(10)]]
    }
    )

    this.userInfo.valueChanges.subscribe(() => {
      this.formErrors = valueChanges(this.userInfo, {...this.formErrors}, this.formErrorMessages);
    });


    this.passwordForm = this._fb.group({
      currentPassword : ["", [Validators.required, Validators.minLength(6)]],
      newPassword : ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword : ["", [Validators.required, Validators.minLength(6)]]
    },
    {
      validators: [passwordValidation.match('newPassword', 'confirmPassword'), 
                    passNotSame.match('currentPassword', 'newPassword')]
    }
)
    this.passwordForm.valueChanges.subscribe(() => {
      this.formErrors = valueChanges(this.passwordForm, {...this.formErrors}, this.formErrorMessages);
    });
  }

  formErrors = {
    first_name: '',
    last_name  : '',
    contact: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  formErrorMessages = {
    first_name: {
      required: 'First name is Required'
    },
    last_name: {
      required: 'Last name is Required'
    },
    contact: {
      required: 'Phone number is Required',
      minlength: 'Minimum length must be 10'
    },
    currentPassword: {
      required: 'Current Password is Required',
      minlength: 'Minimum length must be 6'
    },
    newPassword: {
      required: 'New Password is Required',
      minlength: 'Minimum length must be 6',
      same: 'Current Password and new password should not be same'
    },
    confirmPassword: {
      required: 'Confirm Password is Required',
      minlength: 'Minimum length must be 6',
      matching: 'Password not matched'
    }
  };

  constructor(private _fb : FormBuilder, private _headerServ : HeaderService, private _userServ : UserService) {
   }

   fileChangeEvent(event: any): void {
    this.imageUploaded = true;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      const file = new Image();
      file.src = this.croppedImage;

      const base64 = this.croppedImage;
      const imageName = 'name.jpeg';
      const imageBlob = base64ToFile(base64);
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });

      
      console.log("final", imageFile);
      

      this.finalFile = imageFile;

  }
  showCroppedImage(){
    console.log("showcropped");
    this.showCropped = !this.showCropped;
  }
  back(){
    this.showCropped = !this.showCropped;
   }
  imageLoaded() {
      /* show cropper */
  }
  cropperReady() {
      /* cropper ready */
  }
  loadImageFailed() {
      /* show message */
  }

   uploadImage(){

     var form = new FormData();
     form.append("attachments", this.finalFile)
     this._userServ.imageUpload(form).subscribe((result)=>{
       console.log(result);
      if(result.sucess == true)
      {
        this.imageUploaded = false;
        document.getElementById("avatarImage1").setAttribute("src", "https://bloomia.herokuapp.com/"+result.data.profileImage);
        this._headerServ.img.next(result.data.profileImage);
      }
     })     
   }

   cancelImage(){
    this.imageUploaded = false;
   }

  changeStatus(){
    this.isValid = !this.isValid;
    if(this.isValid)
    {
      this.userInfo.controls.first_name.disable()
      this.userInfo.controls.last_name.disable()
      this.userInfo.controls.contact.disable()
    }
    else
    {
      this.userInfo.controls.first_name.enable()
      this.userInfo.controls.last_name.enable()
      this.userInfo.controls.contact.enable()
    }
  }

  changePassword(){
    this.inactive = !this.inactive;
  }


  submitPassword(){
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.formErrors = valueChanges(this.passwordForm, {...this.formErrors}, this.formErrorMessages);
      return;
    }

    console.log(this.passwordForm.value)

    this._userServ.changePassword(
      {
        "newPassword" : this.passwordForm.value.newPassword,
        "password" : this.passwordForm.value.currentPassword
      }
       ).subscribe((result)=>{
      if(result.sucess){
        this.success = "Password successfully updated"
        this.error = ""
      }
      else if(result.status == 403){
        this.error = "Current password not matched"
        this.success = ""
      }
      else{
        this.error = "Something went wrong"
        this.success = ""
      }
    }, (err)=>{
      if(err){
        this.error = "Something went wrong"
        this.success = ""

      }
    });


    this.inactive = !this.inactive

    this.passwordForm.reset();
  }


  profileUpdate(){
    if(this.userInfo.invalid) {
      this.userInfo.markAllAsTouched();
      this.formErrors = valueChanges(this.userInfo, {...this.formErrors}, this.formErrorMessages);
      return;
    }
    console.log("hello",typeof(this.userInfo.value.contact));

    this._userServ.profileUpdate(this.userInfo.value).subscribe((result)=>{
      // console.log(this.userInfo.value);
      console.log(result);
    });

    this._headerServ.subject.next(this.userInfo.value.first_name+' '+this.userInfo.value.last_name);
    this.isValid = !this.isValid
    if(this.isValid)
    {
      this.userInfo.controls.first_name.disable()
      this.userInfo.controls.last_name.disable()
      this.userInfo.controls.contact.disable()
    }
    else
    {
      this.userInfo.controls.first_name.enable()
      this.userInfo.controls.last_name.enable()
      this.userInfo.controls.contact.enable()
    }
  }

  removeImage(){
    this._userServ.imageUpload({}).subscribe((result)=>{
      console.log(result);
     if(result.sucess == true)
     {
       document.getElementById("avatarImage1").setAttribute("src", "https://bloomia.herokuapp.com/"+result.data.profileImage);
       this._headerServ.img.next(result.data.profileImage);
     }
    }) 
  }

  ngOnInit(): void {
    this.createForm()

    // this._headerServ.subject.next()
   

    this._userServ.getUser().subscribe((result)=>{
      // console.log("he", result);
      this._headerServ.subject.next(result.result.data.first_name+' '+result.result.data.last_name);
      this.userInfo.setValue({
        first_name : result.result.data.first_name,
        last_name : result.result.data.last_name,
        email : result.result.data.email,
        contact : result.result.data.contact
    });
      // console.log(result.result.data.profileImage);
      document.getElementById("avatarImage1").setAttribute("src", "https://bloomia.herokuapp.com/"+result.result.data.profileImage)
  });
  }

}
