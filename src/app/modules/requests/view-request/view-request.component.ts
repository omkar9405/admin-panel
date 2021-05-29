import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  id:'';
  constructor(  private route:ActivatedRoute,private location: Location) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
  }

  back()
  { 
    this.location.back();
  }
}
