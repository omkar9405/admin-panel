import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminsService } from '../_services/admins.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private adminService:AdminsService
        ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.adminService.currentAdminValue;
        if (currentUser) {
            // logged in so return true
            console.log(currentUser);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/adminLogin'], { queryParams: { returnUrl: state.url } });
        return false;

    }
}