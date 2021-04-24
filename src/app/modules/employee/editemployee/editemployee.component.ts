import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { TaskerService } from 'src/app/_services/tasker.service';
import { Location } from '@angular/common';
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
      "name":"",
      "username":"",
      "skills":[{
        "skillname":"",
        "charges":""
      }],
      "completedTasks":"",
      "education":"",
      "imagePath":"",
      "jobtype":"",
      "address":"",
      "pincode":0,
      "mobile": 0,
      "email": "",
      "dob":"",
      "createdAt":"",
      "password":"",
      "active":""
     }
   loading = false;
   submitted = false;
   returnUrl: string;
    error = '';
    imageURL: string;
  
  
    ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      username:['',Validators.required],
      skills:[{
        skillname:['',Validators.required],
        charges:['',Validators.required]
      }
    ],
      completedTasks:['',Validators.required],
      education:['',Validators.required],
      mobile:['',Validators.required],
      jobtype:['',Validators.required],
      address:['',Validators.required],
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
      
      this.taskerDto.name = res.name;
      this.taskerDto.username = res.username;
      this.taskerDto.skills = res.skills;
      this.taskerDto.completedTasks = res.completedTasks;
      this.taskerDto.education = res.education;
      this.taskerDto.jobtype = res.jobtype;
      this.taskerDto.address = res.address;
      this.taskerDto.pincode = res.pincode;
      this.taskerDto.mobile = res.mobile;
      this.taskerDto.dob = res.dob;
      this.taskerDto.email = res.email;
      this.taskerDto.imagePath = res.imagePath;
      this.taskerDto.createdAt = res.createdAt;   
      this.taskerDto.password = res.password;
      this.taskerDto.active = res.active;
      console.log(this.taskerDto);
      // console.log(this.Dto);;
      this.imageURL=this.taskerDto.imagePath;

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
        this.datatableservice.initTable('Employee');
        alert("Updated Successfully");
        
    },(err) => {
        alert(err);
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
