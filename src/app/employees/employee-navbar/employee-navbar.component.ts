import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskerService } from 'src/app/_services/tasker.service';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.css']
})
export class EmployeeNavbarComponent implements OnInit {
  username:'';
 status={
   "active":true
 }
  constructor(
    private router: Router,
    private authenticationService:TaskerService,
    private _snackBar: MatSnackBar   
  )
  {
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    this.username=obj["username"];
   }

  ngOnInit(): void {
    this.loggedin()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,'OK',{horizontalPosition: 'center',verticalPosition: 'top',duration: 3000});
  }

  loggedin()
{
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    var id=obj["id"];
    this.authenticationService.patch(this.status,id).subscribe(
        data => {
          this.openSnackBar("You are Online now");
        },
        err => {
            console.log(err);
            // this.status.active=false;
            // this.authenticationService.logout();
            // this.router.navigate(['/employeeLogin']);
            // alert("You are logged out...Please login again");
        });
}

  logout(){
    var tasker=localStorage.getItem('currentTasker');
    var json = JSON.parse(tasker);
    var obj=json["tasker"];
    var id=obj["id"];
    // this.authenticationService.logout();
    this.router.navigate(['/employeeLogin']);
    this.authenticationService.logout();
    this.status.active=false;
    this.authenticationService.patch(this.status,id)
    .subscribe(
        data => {
          this.openSnackBar("You are Logged out.");
        },
        error => {
          console.log(error);
        });
  }
}
