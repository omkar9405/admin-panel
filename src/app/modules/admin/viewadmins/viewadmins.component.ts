import { Component, EventEmitter, Input, OnChanges, OnInit, Output,SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewadmins',
  templateUrl: './viewadmins.component.html',
  styleUrls: ['./viewadmins.component.css']
})
export class ViewadminsComponent implements OnInit,OnChanges {
  id="";
  @Input()  getid:String;
  @Output() changeId = new EventEmitter();

  updateName() {
    // emitting changeName custom event
    this.changeId.emit();
  }
  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    console.log(this.getid);
  }
  ngOnChanges(changes:SimpleChanges){
    changes.getid;
  }
 

}
