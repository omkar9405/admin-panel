import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editadmins',
  templateUrl: './editadmins.component.html',
  styleUrls: ['./editadmins.component.css']
})
export class EditadminsComponent implements OnInit {
 


@Input()  getid:String;
  public id:string;
  constructor(private route: ActivatedRoute) { 
    this.id=this.route.snapshot.params['id'];
    console.log(this.id);
  }

  ngOnInit(): void {
    // this.id=this.route.snapshot.params['id'];
    // console.log(this.id);
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   changes.id;
  //   console.log(this.id);
  // }
  // onChange(UpdatedValue : string) :void
  // {
  //   this.id = UpdatedValue;
  // }

}
