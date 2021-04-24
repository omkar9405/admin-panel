import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
 sideBarOpen = true;
  constructor() {
    // window.addEventListener("click", () => {
    //   if(this.sideBarOpen==true){
    //  this.sideBarOpen=false;
    //  console.log("listener "+this.sideBarOpen);
    //   }
    //  });
   }
  ngOnInit(): void {
  
    
  }
  

  sideBarToggler()
  {
    if(this.sideBarOpen==false)
    {
    this.sideBarOpen=true;
    console.log(this.sideBarOpen);
    }
    else
    {
    this.sideBarOpen=false;
    }
  }
}
