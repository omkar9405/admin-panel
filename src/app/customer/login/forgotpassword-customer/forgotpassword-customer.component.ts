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
  error = '';
  success='';
  constructor(private location: Location,private formBuilder:FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
      OTP: ['', Validators.required]
  });
  }
  get f() { return this.forgotForm.controls; }

  forgotPassword(){
    this.loadingforgot = true;
  }
sendOTP()
{
  this.loadingOTP = true;
  
}

  back()
{ 
  this.location.back();
}

}
