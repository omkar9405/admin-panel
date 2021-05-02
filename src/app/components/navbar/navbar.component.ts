import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  currentCustomer:String;
  ngOnInit(): void {
    if(localStorage.getItem('currentCustomer')){
    var customer=localStorage.getItem('currentCustomer');
  
    var json = JSON.parse(customer);
    var obj=json["customer"];
    this.currentCustomer=obj["customername"];
    // this.changed();
    }
    console.log(this.currentCustomer)
  }
  dataChanged(e)
  {
    
  }
}
