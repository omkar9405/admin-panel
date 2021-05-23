import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { TaskerService } from 'src/app/_services/tasker.service';
import { Location } from '@angular/common';
import { EmployeeComponent } from '../employee.component';
@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  @Output() getlist: EventEmitter<any> = new EventEmitter();

  signupForm: FormGroup;
  constructor( 
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    public router:Router,
    private location: Location,
    private datatableservice: DatatableService,
    private authenticationService: TaskerService)
     {}

    id="";
    
    taskers=[];
    
    taskerDto = {
      "firstname":"",
      "lastname":"",
      "username":"",
      "skills":[{
        "skillname":"",
        "charges":""
      }],
      "completedTasks":0,
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
  
  
    ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      username:['',Validators.required],
      skillname:['',Validators.required],
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
  
    this.id=this.route.snapshot.params['id'];
    this.getList(this.id);
  }
  get f() { return this.signupForm.controls; }

  getList(ID)
  {
    this.authenticationService.getById(ID).subscribe((res: any) => {
      
      this.taskerDto.firstname = res.firstname;
      this.taskerDto.lastname = res.lastname;
      this.taskerDto.username = res.username;
      this.taskerDto.skills = res.skills;
      this.taskerDto.completedTasks = res.completedTasks;
      this.taskerDto.education = res.education;
      this.taskerDto.jobtype = res.jobtype;
      this.taskerDto.address = res.address;
      this.taskerDto.mobile = res.mobile;
      this.taskerDto.dob = res.dob;
      this.taskerDto.email = res.email;
      this.taskerDto.imagePath = res.imagePath;
      this.taskerDto.createdAt = res.createdAt;   
      this.taskerDto.password = res.password;
      this.taskerDto.active = res.active;
      this.taskerDto.imagePath = res.imagePath;
      console.log(this.taskerDto);
      // console.log(this.Dto);;
      if(this.taskerDto.imagePath=="https://justdialapi.herokuapp.com/images/undefined" || this.taskerDto.imagePath==null)
      {
        this.imageURL="../assets/dp.png";
      }
      else
      {
        this.imageURL=this.taskerDto.imagePath;
      }

    }, (err) => {
      console.log('Error while fetching');
      console.error(err);
    });
    return this.taskerDto;
  }
  
  back()
  { 
    this.location.back();
  }
  update() {
    this.submitted = true;
        this.loading = true;
        
    this.authenticationService.update(this.taskerDto,this.id).subscribe(
      (data:any) => {
        console.log(data);
        alert("Updated Successfully");
        
    },(err) => {
        this.error=err;
        this.loading =false;
    });
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
