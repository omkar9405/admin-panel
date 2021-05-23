import { Component, HostListener, OnInit } from '@angular/core';
import { PreloaderService } from 'src/app/globalloader/preloader/preloader.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
 sideBarOpen=true;
  
 constructor(public loaderService:PreloaderService) {}

  ngOnInit(): void {
}

  sideBarToggler()
  {
    
    this.sideBarOpen=!this.sideBarOpen;
    console.log(this.sideBarOpen);
    
  }
}
