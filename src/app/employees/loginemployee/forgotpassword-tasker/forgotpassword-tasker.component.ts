import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskerService } from 'src/app/_services/tasker.service';
@Component({
  selector: 'app-forgotpassword-tasker',
  templateUrl: './forgotpassword-tasker.component.html',
  styleUrls: ['./forgotpassword-tasker.component.css']
})
export class ForgotpasswordTaskerComponent implements OnInit {

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
    "email":"",
    "password":""
  }
  code="";
  constructor(private location: Location,private formBuilder:FormBuilder, private authenticationService: TaskerService) { }

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
    this.resetDTO.email=this.emailDTO.email;
    this.authenticationService.resetpassword(this.resetDTO,this.code).subscribe((res: any) => {
      this.loadingforgot = false;
      this.submitOTP = false;
      console.log(this.resetDTO);
      console.log("Forgot password successfully");
      console.log(res);
    }, (err) => {
      console.log('Error while reseting password');
      console.error(err);
      this.loadingforgot = false;
      this.submitOTP = false;
      // console.log(res);
    });
    
  }
sendOTP()
{
  this.submittedEmail = true;
  this.loadingOTP = true;
  this.authenticationService.getOTP(this.emailDTO).subscribe((res: any) => {
    this.submittedEmail = false;
    this.loadingOTP = false;
    console.log(this.emailDTO);
    console.log("OTP send successfully");
    console.log(res);
  }, (err) => {
    console.log('Error while sending OTP');
    console.error(err);
    // console.log(res);
    this.submittedEmail = false;
    this.loadingOTP = false;
  });
  
}

  back()
{ 
  this.location.back();
}

}
