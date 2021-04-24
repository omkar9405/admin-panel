import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminsService } from 'src/app/_services/admins.service';

import { Admin } from '../../../_models/admin';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router:Router,private route:ActivatedRoute,private authenticationService: AdminsService) {
    this.authenticationService.currentAdmin.subscribe(x => this.currentAdmin = x);
   }
 
  ngOnInit(): void {
  
  }

  toggleSidebar(){
    this.toggleSideBarForMe.emit();
  }
  currentAdmin: Admin;

   

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/adminLogin']);
    }

}
