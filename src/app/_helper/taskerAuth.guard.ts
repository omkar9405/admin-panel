import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TaskerService } from '../_services/tasker.service';

@Injectable({ providedIn: 'root' })
export class TaskerAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: TaskerService,
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentTasker = this.authenticationService.currentTaskerValue;
        
        if (currentTasker) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/employeeLogin'], { queryParams: { returnUrl: state.url } });
        return false;
        
    
    }
}