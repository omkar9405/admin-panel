import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
sideBarOpen = false;
  constructor() { }

  ngOnInit(): void {
  }
  sideBarToggler()
  {
    if(this.sideBarOpen==false)
    {
    this.sideBarOpen=true;
    }
    else
    {
    this.sideBarOpen=false;
    }
  }
}
