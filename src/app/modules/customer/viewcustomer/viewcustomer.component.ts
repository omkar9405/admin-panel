import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
  @Input() id:String;
  constructor(
    private route:ActivatedRoute,
    private authenticationService: CustomerService,
    private location: Location
  ) { }
 
  customerDto = {
    "firstName":"",
    "lastName":"",
    "address":[{
      "street":"",
      "city":"",
      "state":"",
      "zipcode":""
    }],
    "imagePath":"",
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
      
      this.customerDto.firstName = res.firstName;
      this.customerDto.lastName = res.lastName;
      this.customerDto.address = res.address;
      this.customerDto.mobile = res.mobile;
      this.customerDto.gender = res.gender;
      this.customerDto.email = res.email;
      this.customerDto.imagePath = res.imagePath;
      this.customerDto.dob = res.dob;   
      this.customerDto.password = res.password;
      this.customerDto.feedback=res.feedback;
      console.log(this.customerDto);

    }, (err) => {
      console.log('Error while fetching');
      console.error(err);
    });
    return this.customerDto;
  }
  back()
  { 
    this.location.back();
  }

}
