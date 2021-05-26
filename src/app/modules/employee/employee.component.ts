
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { TaskerService } from 'src/app/_services/tasker.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{


  employees:[];
  id='';
  employeeDto = {
    "firstname":"",
    "lastname":"",
    "username":"",
    "skills":[{
      "skillname":"",
      "charges":""
    }],
    "completedTasks":"",
    "education":"",
    "jobtype":"",
    "address":[{
      "street":"",
      "city":"",
      "state":"",
      "pincode":""
    }],
    "mobile": 0,
    "email": "",
    "dob":"",
    "createdAt":"",
    "password":"",
    "active":""
   }


   
  constructor(public router:Router,
    private datatableservice: DatatableService,
    public route:ActivatedRoute,
    private authenticationService: TaskerService) {
  }

  ngOnInit() {
   
  this.getlist();
  }

 getlist()
 {
  this.authenticationService.gettaskerList().subscribe((res: any) => {
    // console.log(res);
    
    this.employees = res.map((key) => ({ ...key }));
    this.datatableservice.initTable('employee');
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
 }
  
 add()
  {

    this.router.navigate(['add-employee'],{relativeTo:this.route});
  }

  edit(id)
  {
    this.id=id;
    this.router.navigate(['edit-employee',id],{relativeTo:this.route});
  }

  view(id)
  {
    this.id=id;
    this.router.navigate(['view-employee',id],{relativeTo:this.route});
  }
  
  delete(id)
  {
    this.authenticationService.delete(id).subscribe((res: any) => {
      this.datatableservice.destroy();
      this.getlist();
    }, (err) => {
      console.log('Error while deleting ');
      console.error(err);
    });
  }

 
}
