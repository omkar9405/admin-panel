import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleSideBarForMe.emit();
  }
  logout()
  {
    this.router.navigate(['login'],{relativeTo:this.route});
  }

}
