import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { TaskerService } from 'src/app/_services/tasker.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerService } from 'src/app/_services/customer.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/_services/booking.service';
import { formatDate } from '@angular/common';
export interface DialogData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class BookingformComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  loginFormGroup: FormGroup
  taskers:[];
  taskerId:'';
  bookingDto={
    "taskId":"",
    "c_id":"",
    "c_firstName":"",
    "c_lastName":"",
    "phone":"",
    "email":"",
    "address":[{
      "street":"",
      "city":"",
      "state":"",
      "zipcode":""
    }],
    "requestDate":Date.now,
    "taskOption":"",
    "description":"",
    "taskerId":"",
    "isAccepted":false,
    "status":"pending",
    "comment":[
      {
        "name":"",
        "comment":"",
        "commentDate":"",
        "rating":""
      }
    ]
  }
  currentDate=new Date();
  cValue = formatDate(this.currentDate,  'yyyy/MM/dd', 'en');
  display='none';
  id:'';
  loading = false;
  submitted = false;
  logged: boolean;
  constructor(private _formBuilder: FormBuilder,public router:Router,
              public route:ActivatedRoute,public customreService:CustomerService,
              public authenticationService: TaskerService,public dialog: MatDialog,
              private bookingservice:BookingService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      description: ['',Validators.required],
      selecthr:['',Validators.required]
    });
    if(localStorage.getItem('_id')==undefined)
    {
        this.logged=false;
        this.display='block';
    }
    else
    {
      this.logged=true;
      this.onCloseHandled();
      this.getCustomer();
      this.getlist();
    }
    
  }
  getCustomer()
  {
    this.customreService.getById(localStorage.getItem('_id')).subscribe((res: any) => {
      console.log(res);
      this.bookingDto.c_id = res.id;
      this.bookingDto.c_firstName = res.firstName;
      this.bookingDto.c_lastName = res.lastName;
      this.bookingDto.phone =res.mobile;
      this.bookingDto.email = res.email;
      this.bookingDto.address[0].street = res.address[0].street;
      this.bookingDto.address[0].city = res.address[0].city;
      this.bookingDto.address[0].state = res.address[0].state;
      this.bookingDto.address[0].zipcode = res.address[0].zipcode;

    }, (err) => {
      console.log('Error while fetching data');
      console.error(err);
    });
  }

  getlist()
 {
  this.authenticationService.gettaskerList().subscribe((res: any) => {
    console.log("tasker loaded succesfully");
    this.taskers = res.map((key) => ({ ...key }));
    console.log(this.taskers);
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
 }


 taskerSelected(id)
 {
this.bookingDto.taskerId=id;
this.getTasker(this.bookingDto.taskerId);
console.log("selected Id"+this.bookingDto.taskerId);
 }

  book(){
    this.submitted = true;
    this.loading = true;   
    this.bookingservice.save(this.bookingDto).subscribe(
      (data:any) => {
        console.log(data);
        alert("Booked Successfully");
        this.loading = false; 
       
    },(err) => {
        alert(err);
        console.log(err);
        this.loading =false;
    
    });
  }

  onCloseHandled(){
    this.display='none';
 }

 taskerselected:any;
 getTasker(id)
 {
 
  this.authenticationService.getById(id).subscribe((res: any) => {
    console.log("Get tasker succesfully");
    this.taskerselected = res;
    console.log(this.taskerselected);
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
 }
}

