import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup , FormBuilder, Validators  } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
@Component({
  selector: 'app-forgotpassword-customer',
  templateUrl: './forgotpassword-customer.component.html',
  styleUrls: ['./forgotpassword-customer.component.css']
})
export class ForgotpasswordCustomerComponent implements OnInit {
  forgotForm:FormGroup
  loadingOTP = false;
  loadingforgot = false;
  submittedEmail = false;
  submitOTP = false;
  error = '';
  success='';
  emailDTO={
    "email":""
  }
  resetDTO={
    "email":this.emailDTO.email,
    "password":""
  }
  code="";
  constructor(private location: Location,private formBuilder:FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
      OTP: ['', Validators.required],
      password:['',Validators.required]
  });
  }
  get f() { return this.forgotForm.controls; }

  forgotPassword(){
    this.loadingforgot = true;
    this.submitOTP =true;
    this.authenticationService.resetpassword(this.resetDTO,this.code).subscribe((res: any) => {
      this.loadingforgot = false;
      this.submitOTP = false;
      console.log("Forgot password successfully");
     
    }, (err) => {
      console.log('Error while reseting password');
      console.error(err);
      this.loadingforgot = false;
      this.submitOTP = false;
    });
  }

  sendOTP(){
  this.submittedEmail = true;
  this.loadingOTP = true;
  this.authenticationService.getOTP(this.emailDTO).subscribe((res: any) => {
    this.submittedEmail = false;
    this.loadingOTP = false;
    console.log("OTP send successfully");
  }, (err) => {
    console.log('Error while sending OTP');
    console.error(err);
    this.submittedEmail = false;
    this.loadingOTP = false;
  });
  }

  back()
{ 
  this.location.back();
}

}
