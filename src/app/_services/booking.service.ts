import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  headers = new HttpHeaders().set('Token',localStorage.getItem('Token'));
  save(bookingDto): any {
    return this.http.post(`${environment.apiUrl}/request`, bookingDto);
  }

  findAll():any{
    return this.http.get(`${environment.apiUrl}/request/`,{headers: this.headers});
  }
  findAllCustomerRequest(id): any {
    return this.http.get(`${environment.apiUrl}/request/customer/`+id,{ headers: this.headers });
  }

  findAllEmployeeRequest(taskerid):any{
    return this.http.get(`${environment.apiUrl}/request/employee/`+taskerid,{ headers: this.headers });
  }

  findOneRequest(taskid):any{
    return this.http.get(`${environment.apiUrl}/request/`+taskid,{ headers: this.headers });
  }

  findAllCompleted(status):any{
    return this.http.get(`${environment.apiUrl}/request/completed/`+status,{ headers: this.headers });
  }
  updateRequest(taskid):any{
    return this.http.put(`${environment.apiUrl}/request/`+taskid,{ headers: this.headers });
  }

  addComment(taskid):any{
    return this.http.patch(`${environment.apiUrl}/request/addComment/`+taskid,{ headers: this.headers });
  }

  changeStatus(id,status):any{
    return this.http.patch(`${environment.apiUrl}/request/status/`+id,status,{ headers: this.headers });
  }

  isAccepted(taskid,status):any{
    return this.http.patch(`${environment.apiUrl}/request/accepted/`+taskid,status,{ headers: this.headers });
  }
  

  deleteRequest(Id): any {
    return this.http.delete(`${environment.apiUrl}/request/` + Id,{ headers: this.headers });
  }

  // update(customerDto, Id): any {
  //   return this.http.put(`${environment.apiUrl}/customers/` + Id, customerDto,{ headers: this.headers });
  // }

  // getById(Id): any {
  //   return this.http.get(`${environment.apiUrl}/customers/` + Id,{ headers: this.headers });
  // }
}
