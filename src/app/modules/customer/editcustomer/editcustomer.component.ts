import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { CustomerService } from 'src/app/_services/customer.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { Output } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';


@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit {
  @Output() getlist: EventEmitter<any> = new EventEmitter();

  signupForm: FormGroup;
  constructor( 
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private datatableservice: DatatableService,
    private authenticationService: CustomerService)
     {}

    id="";
    
    customers=[];
    
    customerDto = {
    "customername":"",
    "service":"",
    "imagePath":"",
    "address":"",
    "pincode":0,
    "mobile": 0,
    "gender":"",
    "email": "",
    "dob":"",
    "password": "",
    "feedback":""
   }
  
   loading = false;
   submitted = false;
   returnUrl: string;
    error = '';
    imageURL: string;
  
  
    ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      customername:['',Validators.required],
      mobile:['',Validators.required],
      address:['',Validators.required],
      pincode:['',Validators.required],
      service:['',Validators.required],
      gender:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob:['',Validators.required],
      signupcondition:['',Validators.required],
      feedback:['',Validators.required],
      imagePath: [null]
  });
  
    this.id=this.route.snapshot.params['id'];
    this.getCustomer(this.id);
  }
  get f() { return this.signupForm.controls; }

  getCustomer(ID)
  {
    this.authenticationService.getById(ID).subscribe((res: any) => {
      
      this.customerDto.customername = res.customername;
      this.customerDto.service = res.service;
      this.customerDto.address = res.address;
      this.customerDto.imagePath = res.imagePath;
      this.customerDto.pincode = res.pincode;
      this.customerDto.mobile = res.mobile;
      this.customerDto.gender = res.gender;
      this.customerDto.email = res.email;
      this.customerDto.dob = res.dob;   
      this.customerDto.password = res.password;
      this.customerDto.feedback=res.feedback;
      // console.log(this.Dto);;
      this.imageURL=this.customerDto.imagePath;

    }, (err) => {
      console.log('Error while fetching');
      console.error(err);
    });
    return this.customerDto;
  }
  
  update() {
    this.submitted = true;
        this.loading = true;
        
    this.authenticationService.update(this.customerDto,this.id).subscribe(
      (data:any) => {
        console.log(data);
        this.datatableservice.initTable('customer');
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
      this.customerDto.imagePath=this.imageURL;
    }
    reader.readAsDataURL(file)
  }

}
