import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { Customer } from '../../../_models/customer';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router:Router,private route:ActivatedRoute,private authenticationService: AuthenticationService) {
    this.authenticationService.currentCustomer.subscribe(x => this.currentCustomer = x);
   }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleSideBarForMe.emit();
  }
  currentCustomer: Customer;

   

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/home']);
    }

}
