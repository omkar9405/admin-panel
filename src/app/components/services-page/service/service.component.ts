import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
Service=''
City=''
  constructor(private route:ActivatedRoute,private location:Location,private router:Router) { 
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
