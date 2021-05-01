import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';


@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css']
})
export class CustomerNavbarComponent implements OnInit {
  username:'';
 
  constructor(
    private router: Router,
    private authenticationService:AuthenticationService,
  )
  {
    var customer=localStorage.getItem('currentCustomer');
    var json = JSON.parse(customer);
    var obj = json["customer"];
    this.username = obj["customername"];
   }

  ngOnInit(): void {
  
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/customerlogin']);
}

}
