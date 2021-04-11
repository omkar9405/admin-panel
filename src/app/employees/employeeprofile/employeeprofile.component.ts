import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskerService } from 'src/app/_services/tasker.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {
  profileForm:FormGroup;
  imageURL='../assets/dp.png'
  taskerDto = {
    "firstname":"",
    "lastname":"",
    "city":"",
    "imagePath":"",
    "zipcode":0,
    "mobile": 0,
    "gender":"",
    "email": "",
    "dob":"",
    "password": "",
    "street":"",
    "state":"",
   }
   
id=''
username=''
  constructor(private taskerService:TaskerService, private formBuilder:FormBuilder, private datatableservice: DatatableService,  private router: Router,) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstname:['',Validators.required],
      mobile:['',Validators.required],
      city:['',Validators.required],
      zipcode:['',Validators.required],
      lastname:['',Validators.required],
      gender:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob:['',Validators.required],
      state:['',Validators.required],
      street:['',Validators.required],
      imagePath: [null]
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
      this.taskerDto.city = res.address.city;
      this.taskerDto.zipcode = res.address.zipcode;
      this.taskerDto.mobile = res.mobile;
      this.taskerDto.gender = res.gender;
      this.taskerDto.email = res.email;
      this.taskerDto.imagePath = res.imagePath;
      this.taskerDto.dob = res.dob;   
      this.taskerDto.password = res.password;
      this.taskerDto.street=res.address.street;
      this.taskerDto.state=res.address.state;

      console.log(this.taskerDto);

    }, (err) => {
      console.log('Error while fetching');
      console.error(err);
    });
    return this.taskerDto;
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

  logout(){
    this.taskerService.logout();
    this.router.navigate(['/employeeLogin']);
  }

}
