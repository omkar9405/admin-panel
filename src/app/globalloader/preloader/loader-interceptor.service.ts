import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PreloaderService } from './preloader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor{

  constructor(public loaderService:PreloaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   this.loaderService.isLoading.next(true);
   return next.handle(req).pipe(
     finalize(
       ()=>{
         this.loaderService.isLoading.next(false);
       }
     )
   );
  }
}
