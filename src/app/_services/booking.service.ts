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

  getAllRequest():any{
    return this.http.get(`${environment.apiUrl}/`,{headers: this.headers});
  }
  getcustomerRequest(id): any {
    return this.http.get(`${environment.apiUrl}/customer/`+id,{ headers: this.headers });
  }

  getRequestOfemployee(taskerid):any{
    return this.http.get(`${environment.apiUrl}/employee/`+taskerid,{ headers: this.headers });
  }

  getOneTask(taskid):any{
    return this.http.get(`${environment.apiUrl}/`+taskid,{ headers: this.headers });
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
