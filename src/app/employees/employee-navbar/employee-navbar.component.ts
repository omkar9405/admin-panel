import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TaskerService } from 'src/app/_services/tasker.service';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.css']
})
export class EmployeeNavbarComponent implements OnInit {
  username:'';
 status={
   "active":false
 }
  constructor(
    private router: Router,
    private authenticationService:TaskerService,
  )
  {
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    this.username=obj["username"];
   }

  ngOnInit(): void {
  
  }

  logout(){
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    var id=obj["id"];
    // this.authenticationService.logout();
    this.authenticationService.patch(this.status,id)
    .subscribe(
        data => {
          this.authenticationService.logout();
          this.router.navigate(['/employeeLogin']);
            console.log("You are logged out");
        },
        error => {
          this.router.navigate(['/employeeLogin']);
          console.log(error);
        });
  
  }
 


}
