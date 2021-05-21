import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { TaskerService } from 'src/app/_services/tasker.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  signupForm: FormGroup;
  taskerDto = {
    "firstname":"",
    "lastname":"",
    "username":"",
    "skills":[{
      "skillname":"",
      "charges":""
    }],
    "completedTasks":"",
    "education":"",
    "imagePath":"",
    "jobtype":"",
    "address":[{
      "street":"",
      "city":"",
      "state":"",
      "pincode":""
    }],
    "mobile": 0,
    "email": "",
    "feedback":"",
    "gender":"",
    "dob":"",
    "createdAt":"",
    "password":"",
    "active":false
   }
 loading = false;
 submitted = false;
 returnUrl: string;
  error = '';
  imageURL: string;

  constructor(  private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    public router:Router,
    private location: Location,
    private datatableservice: DatatableService,
    private authenticationService: TaskerService) { }
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      username:['',Validators.required],
      skillname:['',Validators.required],
      gender:['',Validators.required],
      charges:['',Validators.required],
      completedTasks:['',Validators.required],
      education:['',Validators.required],
      mobile:['',Validators.required],
      jobtype:['',Validators.required],
      street:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pincode:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob:['',Validators.required],
      imagePath: [null]
  });
  }
  get f() { return this.signupForm.controls; }

save(){

}

back()
{ 
  this.location.back();
}


showPreview(event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.signupForm.patchValue({
    imagePath: file
  });
  this.signupForm.get('imagePath').updateValueAndValidity()

  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    this.imageURL = reader.result as string;
    this.taskerDto.imagePath=this.imageURL;
  }
  reader.readAsDataURL(file)
}


}
