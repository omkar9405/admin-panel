import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskerService {
  constructor(private http:HttpClient) { }
  headers = new HttpHeaders().set('Token',localStorage.getItem('Token'));
  save(customerDto): any {
    return this.http.post(`${environment.apiUrl}/taskers/`, customerDto);
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
}
