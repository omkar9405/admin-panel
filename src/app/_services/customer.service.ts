import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }
  headers = new HttpHeaders().set('Token',localStorage.getItem('Token'));
  save(customerDto): any {
    return this.http.post(`${environment.apiUrl}/customers/signup`, customerDto);
  }

  getcustomerList(): any {
    return this.http.get(`${environment.apiUrl}/customers/`,{ headers: this.headers });
  }

  delete(Id): any {
    return this.http.delete(`${environment.apiUrl}/customers/` + Id,{ headers: this.headers });
  }

  update(customerDto, Id): any {
    return this.http.put(`${environment.apiUrl}/customers/` + Id, customerDto,{ headers: this.headers });
  }

  getById(Id): any {
    return this.http.get(`${environment.apiUrl}/customers/` + Id,{ headers: this.headers });
  }

  
 
 }
