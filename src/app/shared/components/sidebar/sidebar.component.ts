import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
 
name="";
email="";
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['dashboard'],{relativeTo:this.route});
    var admin=localStorage.getItem('currentAdmin');
    var json = JSON.parse(admin);
    var obj=json["admin"];
    this.name=obj["name"];
   this.email=obj["email"];
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
  articles()
  {
   
    this.router.navigate(['articles'],{relativeTo:this.route});
  }

}
