import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layout/default/default.module';
import { DropdownModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './_helper';
import { LoginemployeeComponent } from './employees/loginemployee/loginemployee.component';
import { CustomerprofileComponent } from './customer/customerprofile/customerprofile.component';
import { DatatableService } from './_services/datatableservice/datatable.service';
import { SignupEmployeeComponent } from './employees/signup-employee/signup-employee.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { EditemployeeComponent } from './modules/employee/editemployee/editemployee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginemployeeComponent,
    CustomerprofileComponent,
    SignupEmployeeComponent,
    AdminLoginComponent,
    LayoutComponent,
    EditemployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    DropdownModule.forRoot(),
    HttpClientModule,
 
  ],
  providers: [   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },DatatableService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
