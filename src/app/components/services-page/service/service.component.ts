import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {Location} from '@angular/common';
import { TaskerService } from 'src/app/_services/tasker.service';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
Service='';
City='';
taskers:[];
  constructor(private route:ActivatedRoute,private location:Location,private router:Router,private getAPI:TaskerService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });

  this.getTaskers();
  }

  getTaskers(){
    this.getAPI.gettaskerList().subscribe((res: any) => {
      console.log("Taskers loaded successful");
      this.taskers = res.map((key) => ({ ...key }));
      console.log(this.taskers);
      
    }, (err) => {
      console.log('Error while fetching data');
      console.error(err);
    });
  }

  ngOnInit(): void {
    
    this.Service = this.route.snapshot.paramMap.get('service');
    this.City = this.route.snapshot.paramMap.get('city'); 
  }
  back()
  {
    this.location.back();
  }

}
