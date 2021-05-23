import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/globalloader/preloader/preloader.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CustomerService } from 'src/app/_services/customer.service';
import { TaskerService } from 'src/app/_services/tasker.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
c_id='';
t_id='';
customerDto = {
  "id":"",
  "firstName":"",
  "lastName":"",
  "imagePath":""
 }
 taskerDto={
  "id":"",
  "firstname":"",
  "lastname":"",
  "imagePath":"",
  "username":""
 }
  constructor(private customerService:CustomerService,
    private authenticationService:AuthenticationService,
    private taskerService:TaskerService,
    private router: Router,
    public loaderService:PreloaderService) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentCustomer')!=null){
    var customer=localStorage.getItem('currentCustomer');
    var json = JSON.parse(customer);
    var obj=json["customer"];
    this.c_id=obj['id'];
    this.getCustomer();
    }

    if(localStorage.getItem('currentTasker')!=null){
      var tasker=localStorage.getItem('currentTasker');
      var json = JSON.parse(tasker);
      var obj=json["tasker"];
      this.t_id=obj['id'];
      this.getTasker();
      }

  }
  getCustomer(){
    this.customerService.getById(this.c_id).subscribe((res: any) => {
      this.customerDto.id = res.id;
      this.customerDto.firstName = res.firstName;
      this.customerDto.lastName = res.lastName;
      this.customerDto.imagePath = res.imagePath;
      console.log(this.customerDto);  
    }, (err) => {
      console.log('You are logged out');
      alert('You are logged out!! Please login again..');
      console.error(err);
    });
    return this.customerDto;
   }

   getTasker(){
    this.taskerService.getById(this.t_id).subscribe((res: any) => {
      this.taskerDto.id = res.id;
      this.taskerDto.firstname = res.firstname;
      this.taskerDto.lastname = res.lastname;
      this.taskerDto.imagePath = res.imagePath;
      this.taskerDto.username = res.username;
      console.log(this.taskerDto);  
    }, (err) => {
      console.log('You are logged out');
      alert('You are logged out!! Please login again..');
      console.error(err);
    });
    return this.taskerDto;
   }

   logoutCutomer() {
    this.authenticationService.logout();
    this.c_id='';
    localStorage.removeItem('_id');
    }

    status={
      "active":"false"
    }
  logoutTasker() {
    this.taskerService.patch(this.status,this.taskerDto.id)
    .subscribe(
        data => {
          this.taskerService.logout();
          this.t_id='';
          localStorage.removeItem('_id');
          this.router.navigate(['/employeeLogin']);
            console.log("You are logged out");
        },
        error => {
          console.log(error);
        });
  
  }
}
