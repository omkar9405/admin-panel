import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
import { TaskerService } from '../_services/tasker.service';
import { AdminsService } from '../_services/admins.service';

@Injectable()
export class JwtCustomerInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentCustomerValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

      return next.handle(request);
    }
}
@Injectable()
export class JwtAdminInterceptor implements HttpInterceptor {
  constructor(private adminService: AdminsService) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if user is logged in and request is to the api url
      const currentUser = this.adminService.currentAdminValue;
      const isLoggedIn = currentUser && currentUser.token;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (isLoggedIn && isApiUrl) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }

    return next.handle(request);
  }
}
@Injectable()
export class JwtTaskerInterceptor implements HttpInterceptor {
  constructor(private taskerService: TaskerService) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if user is logged in and request is to the api url
      const currentUser = this.taskerService.currentTaskerValue;
      const isLoggedIn = currentUser && currentUser.token;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (isLoggedIn && isApiUrl) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }

    return next.handle(request);
  }
}