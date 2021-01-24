import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../../../_models/user';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router:Router,private route:ActivatedRoute,private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleSideBarForMe.emit();
  }
  currentUser: User;

   

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
