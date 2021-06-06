import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { Customer } from '../_models/customer';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentCustomerSubject: BehaviorSubject<Customer>;
    public currentCustomer: Observable<Customer>;
    headers = new HttpHeaders().set('Token',localStorage.getItem('Token'));
    constructor(private http: HttpClient) {
        this.currentCustomerSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentCustomer')));
        this.currentCustomer = this.currentCustomerSubject.asObservable();
    }

    public get currentCustomerValue(): Customer {
        return this.currentCustomerSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/customers/login`, { email, password })
            .pipe(map(customer => {
                // store Customer details and jwt token in local storage to keep Customer logged in between page refreshes
                localStorage.setItem('Token',customer.token);
                const cust=this.getDecodedAccessToken(customer.token)
                localStorage.setItem('currentCustomer', JSON.stringify(cust));
                this.currentCustomerSubject.next(cust);
                return cust;
            }));
    }
    signup(customerDto): any {
        return this.http.post<any>(`${environment.apiUrl}/customers/signup`, customerDto);       
      }
    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

    logout() {
        // remove Customer from local storage to log Customer out
        localStorage.removeItem('currentCustomer');
        localStorage.removeItem('Token');
        
        this.currentCustomerSubject.next(null);
    }
    //Taskers
    getOTP(Email){
        return this.http.post<any>(`${environment.apiUrl}/customers/sendOTP`,Email);
      }
    
      resetpassword(passwordDto,code){
        return this.http.patch<any>(`${environment.apiUrl}/customers/passwordreset/`+ code,passwordDto);
      }

}