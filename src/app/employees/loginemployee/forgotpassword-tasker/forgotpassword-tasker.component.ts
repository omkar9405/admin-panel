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
  error = '';
  success='';
  constructor(private location: Location,private formBuilder:FormBuilder, private taskerService: TaskerService) { }

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
