import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  
  customerDto = {
   "customername":"",
   "mobile": 0,
   "gender":"",
   "email": "",
   "dob":"",
   "password": "",
   "signupcondition":"Accepted"
  }
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
  ) { }
 
 
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      customername:['',Validators.required],
      mobile:['',Validators.required],
      gender:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob:['',Validators.required],
      signupcondition:['',Validators.required]
  });
  }

  get f() { return this.signupForm.controls; }

  register() {
    this.submitted = true;


        this.loading = true;
    this.authenticationService.signup(this.customerDto).subscribe(
      (data:any) => {
        console.log(data);
     
        alert("Registered Successfully");
        this.clearAll();
       
    },(err) => {
        alert(err);
        this.error=err;
        this.loading =false;
    
    });
  }

  clearAll()
  {
    this.customerDto.customername="",
    this.customerDto.mobile= 0,
    this.customerDto.gender="",
    this.customerDto.email= "",
    this.customerDto.dob="",
    this.customerDto.password= ""
  }

}