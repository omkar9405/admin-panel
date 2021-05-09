import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TaskerService } from 'src/app/_services/tasker.service';

@Component({
  selector: 'app-signup-employee',
  templateUrl: './signup-employee.component.html',
  styleUrls: ['./signup-employee.component.css']
})
export class SignupEmployeeComponent implements OnInit {

  signupForm: FormGroup;
  success='';
  taskerDto = {
   "firstname":"",
   "lastname":"",
   "mobile": 0,
   "gender":"Select Gender",
   "email": "",
   "dob":"",
   "username":"",
   "jobtype":"Select Job Type",
   "password": "",
   "skills":[{
    "skillname":"",
    "charges":""
  },
  {
    "skillname":"",
    "charges":""
  }
],
   "address":[{
     "street":"",
     "city":"",
     "state":"",
     "pincode":""
   }]
  }
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: TaskerService
  ) {
    
   }
 
 
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      mobile:['',Validators.required],
      gender:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob:['',Validators.required],
      jobtype:['',Validators.required],
      username:['',Validators.required]
  });
  }

  get f() { return this.signupForm.controls; }

  register() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.save(this.taskerDto).subscribe(
      (data:any) => 
      {
        console.log(data);
        this.success='success';
        alert("Registered Successfully");
        this.clearAll();
        this.loading = false;
        this.router.navigate(['/employeeLogin']);
    },(err) => {
        alert(err);
        this.error=err;
        this.loading =false;
    
    });
  }

  clearAll()
  {
    this.taskerDto.firstname="",
    this.taskerDto.lastname="",
    this.taskerDto.mobile= 0,
    this.taskerDto.username="",
    this.taskerDto.gender="Select Gender",
    this.taskerDto.email= "",
    this.taskerDto.jobtype="Select Job Type",
    this.taskerDto.dob="",
    this.taskerDto.password= ""
  }


}
