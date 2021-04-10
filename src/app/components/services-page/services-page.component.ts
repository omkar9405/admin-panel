import { Component, Input, OnInit } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {

  city="Select City";

  Showservice=false;
  hideservice=true;
  constructor(private route:ActivatedRoute,private router:Router) { 
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
    this.city = this.route.snapshot.paramMap.get('city');
  }

  selectCity(city){
    this.city=city;
  }

  submit(service)
  {
    this.Showservice=true;
    this.hideservice=false;
    
    this.router.navigate(['services',service]);
  }

}
