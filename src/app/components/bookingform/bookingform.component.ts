import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { TaskerService } from 'src/app/_services/tasker.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  
  taskerId:'';
  taskers:[];
  loading = false;
  submitted = false;
  constructor(private _formBuilder: FormBuilder,public router:Router,
    public route:ActivatedRoute,
    private authenticationService: TaskerService) {}

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
    this.getlist()
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

}
