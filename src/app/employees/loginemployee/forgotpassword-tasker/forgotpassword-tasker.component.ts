import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-forgotpassword-tasker',
  templateUrl: './forgotpassword-tasker.component.html',
  styleUrls: ['./forgotpassword-tasker.component.css']
})
export class ForgotpasswordTaskerComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back()
{ 
  this.location.back();
}

}
