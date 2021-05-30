import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from 'src/app/_services/admins.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
 
  adminDto={
    "name":"",
    "permissions":"",
    "username":"",
    "mobile":"",
    "email":"",
    "imagePath":"../assets/dp.png"
  }
  id:'';
  imageURL: string;
  constructor(private router:Router,private route:ActivatedRoute,  private authenticationService: AdminsService) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard'],{relativeTo:this.route});
    var admin=localStorage.getItem('currentAdmin');
    var json = JSON.parse(admin);
    var obj=json["admin"];
    this.id=obj["id"];
    this.getAdmin();
  }
  
  getAdmin()
   {
    this.authenticationService.getById(this.id).subscribe((res: any) => {
    this.adminDto.name=res.name;
    this.adminDto.username=res.username;
    this.adminDto.mobile=res.mobile;
    this.adminDto.email=res.email;
    this.adminDto.permissions=res.permissions;
    this.adminDto.imagePath=res.imagePath;  
    if(this.adminDto.imagePath=="https://justdialapi.herokuapp.com/images/undefined" || this.adminDto.imagePath==null )
    {
      this.imageURL="../assets/dp.png";
    }
    else
    {
      this.imageURL=this.adminDto.imagePath;
    }  
    
    console.log(this.adminDto);
    }, (err) => {
      console.log('Error while fetching data:viewadminsidebar '+this.id);
      console.log(err);
      location.reload(true);
    });
   }

  dash()
  {
  
    this.router.navigate(['dashboard'],{relativeTo:this.route});
  }
  admin()
  {
  
    this.router.navigate(['admin'],{relativeTo:this.route});
  }
  employee()
  {

    this.router.navigate(['employee'],{relativeTo:this.route});
  }
  posts()
  {
   
    this.router.navigate(['posts'],{relativeTo:this.route});
  }
  customer()
  {
   
    this.router.navigate(['customer'],{relativeTo:this.route});
  }
  requests()
  {
   
    this.router.navigate(['requests'],{relativeTo:this.route});
  }
  articles()
  {
   
    this.router.navigate(['articles'],{relativeTo:this.route});
  }

}
