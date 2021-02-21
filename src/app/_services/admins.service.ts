import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Admin } from '../_models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  private currentAdminSubject: BehaviorSubject<Admin>;
    public currentAdmin: Observable<Admin>;
    headers = new HttpHeaders().set('Token',localStorage.getItem('Token'));
    constructor(private http: HttpClient) {
        this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentCustomer')));
        this.currentAdmin = this.currentAdminSubject.asObservable();
    }

    public get currentAdminValue(): Admin {
        return this.currentAdminSubject.value;
    }

    login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/admin/login`, { username, password })
          .pipe(map(admin => {
              // store Customer details and jwt token in local storage to keep Customer logged in between page refreshes
              localStorage.setItem('Token',admin.token);
              const ad=this.getDecodedAccessToken(admin.token)
              localStorage.setItem('currentAdmin', JSON.stringify(ad));
              this.currentAdminSubject.next(ad);
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

  save(adminDto): any {
    return this.http.post<any>(`${environment.apiUrl}/admin/`, adminDto);
  }

  getadminList(): any {
    return this.http.get(`${environment.apiUrl}/admin/`,{ headers: this.headers });
  }

  delete(Id): any {
    return this.http.delete(`${environment.apiUrl}/admin/` + Id,{ headers: this.headers });
  }
  update(adminDto, Id): any {
    return this.http.put(`${environment.apiUrl}/admin/` + Id, adminDto,{ headers: this.headers });
  }

  getById(Id): any {
    return this.http.get(`${environment.apiUrl}/admin/` + Id,{ headers: this.headers });
  }
  logout() {
    // remove Customer from local storage to log Customer out
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
}

}
