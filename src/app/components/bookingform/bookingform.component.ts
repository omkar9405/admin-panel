import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { TaskerService } from 'src/app/_services/tasker.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerService } from 'src/app/_services/customer.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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

  taskerId:'';
  taskers:[];
  customer:[];
  display='none';
  id:'';
  loading = false;
  submitted = false;
  logged: boolean;
  constructor(private _formBuilder: FormBuilder,public router:Router,
              public route:ActivatedRoute,public customreService:CustomerService,
              public authenticationService: TaskerService,public dialog: MatDialog,
              private modalService: NgbModal) {}

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
    if(localStorage.getItem('_id')==null)
    {
      this.logged=false;
    
        this.display='block';
     
    }
    else
    {
      this.logged=true;
      this.onCloseHandled();
      this.getCustomer(localStorage.getItem('_id'));
    }
    this.getlist();
  }
  getCustomer(id)
  {
    this.customreService.getById(localStorage.getItem('_id')).subscribe((res: any) => {
      console.log(res);
      this.customer = res.map((key) => ({ ...key }));
      console.log(this.customer);
    }, (err) => {
      console.log('Error while fetching data');
      console.error(err);
    });
  }
  getlist()
 {
  this.authenticationService.gettaskerList().subscribe((res: any) => {
    console.log(res);
    this.taskers = res.map((key) => ({ ...key }));
    console.log(this.taskers);
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
 }


 taskerSelected(id)
 {
this.taskerId=id;
console.log("selected Id"+this.taskerId);
 }

  book(){
    this.submitted = true;
    this.loading = true;   
  }

  onCloseHandled(){
    this.display='none';
 }

}

