import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-forgotpassword-customer',
  templateUrl: './forgotpassword-customer.component.html',
  styleUrls: ['./forgotpassword-customer.component.css']
})
export class ForgotpasswordCustomerComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back()
{ 
  this.location.back();
}

}
