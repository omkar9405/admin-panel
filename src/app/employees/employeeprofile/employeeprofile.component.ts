import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskerService } from 'src/app/_services/tasker.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {
  profileForm:FormGroup;
  imageURL='';
  tasker=[];
  taskerDto = {
    "username":"",
    "firstname":"",
    "lastname":"",
    "imagePath":"",
    "address":[{
      "street":"",
      "city":"",
      "state":"",
      "pincode":0
    }],
    "education":"",
    "completedTasks":0,
    "mobile": 0,
    "skills":[{
      "skillname":"",
      "charges":""
    },
    {
      "skillname":"",
      "charges":""
    }
  ],
    "jobtype":"",
    "gender":"",
    "email": "",
    "dob":"",
    "password": "",
    "active":""
   }
loading = false;
submitted = false;   
id='';
error='';
username='';
  constructor(private taskerService:TaskerService, private formBuilder:FormBuilder, private datatableservice: DatatableService,  private router: Router,) {
    
   }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstname:['',Validators.required],
      username:['',Validators.required],
      mobile:['',Validators.required],
      city:['',Validators.required],
      lastname:['',Validators.required],
      gender:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob:['',Validators.required],
      pincode:['',Validators.required],
      state:['',Validators.required],
      street:['',Validators.required],
      education:['',Validators.required],
      skillname:['',Validators.required],
      charges:['',Validators.required],
      jobtype:['',Validators.required],
      completedTasks:['',Validators.required],
      imagePath: [null],
      skills:[null],
  });
    this.datatableservice.initTable('customers');
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    this.id=obj["id"];
    this.username=obj["username"];
    this.getTasker();
    
  }

   getTasker(){
    this.taskerService.getById(this.id).subscribe((res: any) => {
      
      this.taskerDto.firstname = res.firstname;
      this.taskerDto.lastname = res.lastname;
      this.taskerDto.mobile = res.mobile;
      this.taskerDto.gender = res.gender;
      this.taskerDto.email = res.email;
      this.taskerDto.imagePath = res.imagePath;
      this.taskerDto.dob = res.dob;   
      this.taskerDto.completedTasks = res.completedTasks;
      this.taskerDto.password = res.password;
      this.taskerDto.address[0].street = res.address[0].street;
      this.taskerDto.address[0].city = res.address[0].city;
      this.taskerDto.address[0].state = res.address[0].state;
      this.taskerDto.address[0].pincode = res.address[0].pincode;
      this.taskerDto.skills = res.skills;
      this.taskerDto.education = res.education;
      this.taskerDto.username = res.username;
      this.taskerDto.jobtype = res.jobtype;
      this.taskerDto.active = res.active;
      if(this.taskerDto.imagePath=="https://justdialapi.herokuapp.com/images/undefined")
    {
      this.imageURL="../assets/dp.png";
    }
    else
    {
      this.imageURL=this.taskerDto.imagePath;
    }

      console.log(this.taskerDto);

    }, (err) => {
      console.log('Error while fetching');
      console.error(err);
    });
    return this.taskerDto;
   }

   async update() {
        this.submitted = true;
        this.loading = true;
        this.taskerDto.password = await bcrypt.hash(this.taskerDto.password,await bcrypt.genSalt(10))
        this.taskerService.update(this.taskerDto,this.id).subscribe(
      (data:any) => {
        console.log(data);
        alert("Updated Successfully");
        this.loading=false;
    },(err) => {
        alert(err);
        this.error=err;
        this.loading =false;
    });
  }

   showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({
      imagePath: file
    });
    this.profileForm.get('imagePath').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.taskerDto.imagePath=this.imageURL;
    }
    reader.readAsDataURL(file)
  }

 

}
