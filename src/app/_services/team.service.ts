import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http:HttpClient) { }
  headers = new HttpHeaders().set('Token',localStorage.getItem('Token'));
  save(teamDto): any {
    return this.http.post(`${environment.apiUrl}/teams/`, teamDto);
  }

  getteamList(): any {
    return this.http.get(`${environment.apiUrl}/teams/`);
  }

  delete(Id): any {
    return this.http.delete(`${environment.apiUrl}/teams/` + Id,{ headers: this.headers });
  }

  update(teamDto, Id): any {
    return this.http.put(`${environment.apiUrl}/teams/` + Id, teamDto,{ headers: this.headers });
  }

  getById(Id): any {
    return this.http.get(`${environment.apiUrl}/teams/` + Id,{ headers: this.headers });
  }
}
