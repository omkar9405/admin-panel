import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Tasker } from '../_models/tasker';
@Injectable({
  providedIn: 'root'
})
export class TaskerService {
  private currentTaskerSubject: BehaviorSubject<Tasker>;
  public currentTasker: Observable<Tasker>;

  constructor(private http:HttpClient) {
    this.currentTaskerSubject = new BehaviorSubject<Tasker>(JSON.parse(localStorage.getItem('currentTasker')));
        this.currentTasker = this.currentTaskerSubject.asObservable();
   }

   public get currentTaskerValue(): Tasker {
    return this.currentTaskerSubject.value;
}

login(username: string, password: string) {
  return this.http.post<any>(`${environment.apiUrl}/taskers/login`, { username, password })
      .pipe(map(tasker => {
          // store Customer details and jwt token in local storage to keep Customer logged in between page refreshes
          localStorage.setItem('Token',tasker.token);
          const ad=this.getDecodedAccessToken(tasker.token)
          localStorage.setItem('currentTasker', JSON.stringify(ad));
          this.currentTaskerSubject.next(ad);
          return ad;
      }));
}
getDecodedAccessToken(token: string): any {
try{
    return jwt_decode(token);
}
catch(Error){
    return null;
}
}

  headers = new HttpHeaders().set('Token',localStorage.getItem('Token'));
  save(customerDto): any {
    return this.http.post(`${environment.apiUrl}/taskers/signup`, customerDto);
  }

  gettaskerList(): any {
    return this.http.get(`${environment.apiUrl}/taskers/`);
  }

  delete(Id): any {
    return this.http.delete(`${environment.apiUrl}/taskers/` + Id,{ headers: this.headers });
  }

  update(customerDto, Id): any {
    return this.http.put(`${environment.apiUrl}/taskers/` + Id, customerDto,{ headers: this.headers });
  }

  getById(Id): any {
    return this.http.get(`${environment.apiUrl}/taskers/` + Id,{ headers: this.headers });
  }

  patch(status,Id): any {
    return this.http.patch(`${environment.apiUrl}/taskers/status/` + Id ,status,{ headers: this.headers });
  }
  logout() {
    // remove Customer from local storage to log Customer out
  
    localStorage.removeItem('currentTasker');
    this.currentTaskerSubject.next(null);
}
}
