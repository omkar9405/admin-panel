import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { TaskerService } from 'src/app/_services/tasker.service';
import { Output } from '@angular/core';
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
    "password":"",
    "active":false
   }
 loading = false;
 submitted = false;
 returnUrl: string;
  error = '';
  imageURL: string;

  constructor(  private formBuilder: FormBuilder,
    public router:Router,
    private location: Location,
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
      feedback:['',Validators.required],
      imagePath: [null]
  });
  if(this.imageURL==null)
  {
    this.imageURL="../assets/dp.png";
  }
  }

  get f() { return this.signupForm.controls; }

register(){
  this.submitted = true;
  this.loading = true;
  console.log(this.taskerDto);
  this.authenticationService.save(this.taskerDto).subscribe(
    (data:any) => 
    {
      console.log(data);
      alert("Registered Successfully");
      this.loading = false;
  },(err) => {
      alert(err);
      this.error=err;
      this.loading =false;
  
  });
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
