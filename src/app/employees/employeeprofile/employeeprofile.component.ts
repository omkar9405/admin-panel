import { Component, OnInit } from '@angular/core';
import { TaskerService } from 'src/app/_services/tasker.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { BookingService } from 'src/app/_services/booking.service';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/globalloader/preloader/preloader.service';

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
    "id":"",
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
id:any;
error='';
username='';
  constructor(private taskerService:TaskerService, 
    private formBuilder:FormBuilder, 
    private router: Router,
    private datatableservice: DatatableService,  
    private bookingService:BookingService,
    public loaderService:PreloaderService) {
     
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
      skillname1:['',Validators.required],
      skillname2:['',Validators.required],
      charges1:['',Validators.required],
      charges2:['',Validators.required],
      jobtype:['',Validators.required],
      completedTasks:['',Validators.required],
      imagePath: [null]
  });
    this.datatableservice.initTable('customers');
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    this.id=obj["id"];
    this.username=obj["username"];
    this.getTasker();
    // if(localStorage.getItem('currentTasker')!=undefined){
    // setInterval(() => {
    //   this.getBookings();
    // }, 10000);
    // }
    // else{
    //   stop
    // }

  }

   getTasker(){
    this.taskerService.getById(this.id).subscribe((res: any) => {
      this.taskerDto.id = res.id;
      this.taskerDto.firstname = res.firstname;
      this.taskerDto.lastname = res.lastname;
      this.taskerDto.mobile = res.mobile;
      this.taskerDto.gender = res.gender;
      this.taskerDto.email = res.email;
      this.taskerDto.imagePath = res.imagePath;
      this.taskerDto.dob = res.dob;   
      this.taskerDto.completedTasks = res.completedTasks;
      this.taskerDto.password = res.password;
      this.taskerDto.address = res.address;
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
    this.getBookings();
      console.log(this.taskerDto);
      // this.getBookings();
    }, (err) => {
      console.log('Error while fetching getbyid');
      console.log(err);
    });
    return this.taskerDto;
   }

    update() {
        this.submitted = true;
        this.loading = true;
        // this.taskerDto.password = await bcrypt.hash(this.taskerDto.password,await bcrypt.genSalt(10));
        this.taskerService.update(this.taskerDto,this.id).subscribe(
      (data:any) => {
        console.log(data);
        alert("Updated Successfully");
        console.log(this.taskerDto);
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

 //get bookings
requests:[];
 getBookings(){
    this.bookingService.findAllEmployeeRequest(this.taskerDto.id).subscribe((res: any) => {
    // console.log("Request loaded successful");
    this.requests = res.map((key) => ({ ...key }));
    // console.log(this.requests);
    
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
}


statusDto={
  "isAccepted":false
}
action(id,status)
{
  this.statusDto.isAccepted= status;
  this.bookingService.isAccepted(id,this.statusDto).subscribe((res: any) => {
    this.getBookings();
    // console.log(res);
    
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
}


selected={
  "id":"",
  "c_firstName":"",
  "c_lastName":"",
  "email":"",
  "phone":"",
  "description":"",
  "address":[{
    "street":"",
    "city":"",
    "state":"",
    "zipcode":""
  }],
  "status":"",
  "isAccepted":false
};
display='none';
view(request){
this.selected.id=request.id;
this.selected.c_firstName= request.c_firstName;
this.selected.c_lastName=request.c_lastName;
this.selected.email=request.email;
this.selected.phone=request.phone;
this.selected.description=request.description;
this.selected.address[0].street=request.address[0].street;
this.selected.address[0].city=request.address[0].city;
this.selected.address[0].state=request.address[0].state;
this.selected.address[0].zipcode=request.address[0].zipcode;
this.selected.status=request.status;
this.selected.isAccepted=request.isAccepted;
if(this.display=='none')
{
  this.display='block';
  // console.log(this.selected);
}
} show()
{

  return this.display;
}
refresh()
{
  this.datatableservice.destroy();
  this.getBookings();
}
}
