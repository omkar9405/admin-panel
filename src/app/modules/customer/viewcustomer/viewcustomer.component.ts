import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
  id="";
  constructor(
    private route:ActivatedRoute,
    private authenticationService: CustomerService
  ) { }
 
  customerDto = {
    "customername":"",
    "service":"",
    "address":"",
    "pincode":0,
    "mobile": 0,
    "gender":"",
    "email": "",
    "dob":"",
    "password": "",
    "feedback":""
   }
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.getCustomer(this.id);
  }
  getCustomer(ID)
  {
    this.authenticationService.getById(ID).subscribe((res: any) => {
      
      this.customerDto.customername = res.customername;
      this.customerDto.service = res.service;
      this.customerDto.address = res.address;
      this.customerDto.pincode = res.pincode;
      this.customerDto.mobile = res.mobile;
      this.customerDto.gender = res.gender;
      this.customerDto.email = res.email;
      this.customerDto.dob = res.dob;   
      this.customerDto.password = res.password;
      this.customerDto.feedback=res.feedback;
      // console.log(this.Dto);

    }, (err) => {
      console.log('Error while fetching');
      console.error(err);
    });
    return this.customerDto;
  }

}
