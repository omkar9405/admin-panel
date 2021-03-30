import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-signup-employee',
  templateUrl: './signup-employee.component.html',
  styleUrls: ['./signup-employee.component.css']
})
export class SignupEmployeeComponent implements OnInit {

  signupForm: FormGroup;
  success='';
  taskerDto = {
   "customername":"",
   "mobile": 0,
   "gender":"Select Gender",
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
    this.authenticationService.signup(this.taskerDto).subscribe(
      (data:any) => {
        console.log(data);
        this.success='success';
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
    this.taskerDto.customername="",
    this.taskerDto.mobile= 0,
    this.taskerDto.gender="",
    this.taskerDto.email= "",
    this.taskerDto.dob="",
    this.taskerDto.password= ""
  }


}
