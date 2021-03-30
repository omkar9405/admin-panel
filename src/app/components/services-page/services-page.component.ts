import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit {
city="Select City";
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('city')!=null)
    {
      this.city=localStorage.getItem('city');
    }
  }
selectCity(city){
  this.city=city;
}

}
