import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { PreloaderService } from './globalloader/preloader/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'justDial-dashboard';
  constructor(private preloader: PreloaderService){

  }
  ngAfterViewInit(): void {
    
    this.preloader.hide();
  }
}
