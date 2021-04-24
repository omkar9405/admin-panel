import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskerService } from 'src/app/_services/tasker.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent implements OnInit {

  @Input() id:String;
  constructor(
    private route:ActivatedRoute,
    private authenticationService: TaskerService,
    private location: Location
  ) { }
 
  taskerDto = {
    "name":"",
    "username":"",
    "skills":[{
      "skillname":"",
      "charges":""
    }],
    "completedTasks":"",
    "education":"",
    "imagePath":"",
    "jobtype":"",
    "address":"",
    "pincode":0,
    "mobile": 0,
    "email": "",
    "dob":"",
    "createdAt":"",
    "password":"",
    "active":""
   }
  ngOnInit(): void {
     this.id=this.route.snapshot.params['id'];
    this.getList(this.id);
  }
  getList(ID)
  {
    this.authenticationService.getById(ID).subscribe((res: any) => {
      
      this.taskerDto.name = res.name;
      this.taskerDto.username = res.username;
      this.taskerDto.skills = res.skills;
      this.taskerDto.completedTasks = res.completedTasks;
      this.taskerDto.education = res.education;
      this.taskerDto.jobtype = res.jobtype;
      this.taskerDto.address = res.address;
      this.taskerDto.pincode = res.pincode;
      this.taskerDto.mobile = res.mobile;
      this.taskerDto.dob = res.dob;
      this.taskerDto.email = res.email;
      this.taskerDto.imagePath = res.imagePath;
      this.taskerDto.createdAt = res.createdAt;   
      this.taskerDto.password = res.password;
      this.taskerDto.active = res.active;
      console.log(this.taskerDto);

    }, (err) => {
      console.log('Error while fetching');
      console.error(err);
    });
    return this.taskerDto;
  }
  back()
  { 
    this.location.back();
  }


}
