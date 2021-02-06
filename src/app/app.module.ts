import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layout/default/default.module';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './_helper';
import { LoginemployeeComponent } from './employees/loginemployee/loginemployee.component';
import { EmployeeprofileComponent } from './employees/employeeprofile/employeeprofile.component';
import { LogincustomerComponent } from './customer/logincustomer/logincustomer.component';
import { CustomerprofileComponent } from './customer/customerprofile/customerprofile.component';
import { DatatableService } from './_services/datatableservice/datatable.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginemployeeComponent,
    EmployeeprofileComponent,
    LogincustomerComponent,
    CustomerprofileComponent,
   
  
    
 
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    HttpClientModule
  ],
  providers: [   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },DatatableService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
