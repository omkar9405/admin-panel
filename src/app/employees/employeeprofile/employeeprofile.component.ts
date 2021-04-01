import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskerService } from 'src/app/_services/tasker.service';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {
  

  constructor(private taskerService:TaskerService,   private router: Router,) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('currentTasker'));
  }

  logout(){
    this.taskerService.logout();
    this.router.navigate(['/employeeLogin']);
  }

}
