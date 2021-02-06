import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  constructor(private http:HttpClient) { }
  save(adminDto): any {
    return this.http.post(`${environment.apiUrl}/admins/signup`, adminDto);
  }

  getadminList(): any {
    return this.http.get(`${environment.apiUrl}/admins/`);
  }

  delete(Id): any {
    return this.http.delete(`${environment.apiUrl}/admins/` + Id);
  }

  update(adminDto, Id): any {
    return this.http.put(`${environment.apiUrl}/admins/` + Id, adminDto);
  }

  getById(Id): any {
    return this.http.get(`${environment.apiUrl}/admins/` + Id);
  }
}
