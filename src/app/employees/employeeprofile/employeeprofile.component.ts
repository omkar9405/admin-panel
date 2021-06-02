import { Component, OnInit } from '@angular/core';
import { TaskerService } from 'src/app/_services/tasker.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { FormBuilder,FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcryptjs';
import { BookingService } from 'src/app/_services/booking.service';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/globalloader/preloader/preloader.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {
  profileForm:FormGroup;
  imageURL='';

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
    public loaderService:PreloaderService,
    private _snackBar: MatSnackBar) {   
   }

   openSnackBar(message: string) {
    this._snackBar.open(message,'OK',{horizontalPosition: 'center',verticalPosition: 'top',duration: 3000});
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
      jobtype:['',Validators.required],
      completedTasks:['',Validators.required],
      active:['',Validators.required],
      imagePath: [''],
      skills: this.formBuilder.array([]),
  });
    this.datatableservice.initTable('customers');
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    this.id=obj["id"];
    this.username=obj["username"];
    this.getTasker();
    // this.getBookings();
  }

  skills() : FormArray {
    return this.profileForm.get("skills") as FormArray
  }

  newSkill(): FormGroup {
    return this.formBuilder.group({
      skillname: '',
      charges: '',
    })
  }

  addSkill() {
    this.skills().push(this.newSkill());
  }

  removeSkill(i:number) {
    this.skills().removeAt(i);
  }

   getTasker(){
    this.taskerService.getById(this.id).subscribe((res: any) => {
      this.profileForm.controls['gender'].setValue(res.gender);
      this.profileForm.controls['firstname'].setValue(res.firstname);
      this.profileForm.controls['lastname'].setValue(res.lastname);
      this.profileForm.controls['mobile'].setValue(res.mobile);
      this.profileForm.controls['email'].setValue(res.email);
      this.profileForm.controls['dob'].setValue(res.dob);
      this.profileForm.controls['completedTasks'].setValue(res.completedTasks);
      this.profileForm.controls['password'].setValue(res.password);
      this.profileForm.controls['street'].setValue(res.address[0].street);
      this.profileForm.controls['city'].setValue(res.address[0].city);
      this.profileForm.controls['state'].setValue(res.address[0].state);
      this.profileForm.controls['pincode'].setValue(res.address[0].pincode);
      this.profileForm.controls['education'].setValue(res.education);
      this.profileForm.controls['username'].setValue(res.username);
      this.profileForm.controls['jobtype'].setValue(res.jobtype);
      this.profileForm.controls['active'].setValue(res.active);
      res.skills.forEach(s => {
        (this.profileForm.get("skills") as FormArray).push(this.newSkill())
      });
      this.profileForm.controls['skills'].patchValue(res.skills);
      this.profileForm.controls['imagePath'].patchValue(res.imagePath);
       if(this.profileForm.get('imagePath').value == "https://justdialapi.herokuapp.com/images/undefined")
      {
        this.imageURL="../assets/dp.png";
      }
      else
      {
        this.imageURL= this.profileForm.get('imagePath').value;
      }
      this.refresh();
      // this.getBookings();
    }, (err) => {
      console.log('Error while fetching getbyid');
      console.log(err);
    });
    return this.profileForm;
   }

    update() {
        this.submitted = true;
        this.loading = true;
        this.taskerService.update(this.profileForm.value,this.id).subscribe(
      (data:any) => {
        console.log(data);
        this.openSnackBar("Updated Successfull");
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
      this.profileForm.controls['imagePath'].setValue(this.imageURL);
    }
    reader.readAsDataURL(file)
  }

 //get bookings
requests:[];
 getBookings(){
    this.bookingService.findAllEmployeeRequest(this.id).subscribe((res: any) => {
    this.requests = res.map((key) => ({ ...key }));
    console.log(this.requests);
    this.datatableservice.initTable('bookings');
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
    this.refresh();
   
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
}
}
 
show()
{
  return this.display;
}

refresh()
{
  this.datatableservice.destroy();
  this.getBookings();
}
}
