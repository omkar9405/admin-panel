import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http:HttpClient) { }
  save(employeeDto): any {
    return this.http.post(`${environment.apiUrl}/employee/`, employeeDto);
  }

  getemployeeList(): any {
    return this.http.get(`${environment.apiUrl}/employee/`);
  }

  delete(Id): any {
    return this.http.delete(`${environment.apiUrl}/employee/` + Id);
  }

  update(employeeDto, Id): any {
    return this.http.put(`${environment.apiUrl}/employee/` + Id, employeeDto);
  }

  getById(Id): any {
    return this.http.get(`${environment.apiUrl}/employee/` + Id);
  }
}
