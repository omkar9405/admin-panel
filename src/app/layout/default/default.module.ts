import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { CustomerComponent } from 'src/app/modules/customer/customer.component';
import { EmployeeComponent } from 'src/app/modules/employee/employee.component';
import { AddEmployeeComponent } from 'src/app/modules/employee/add-employee/add-employee.component';
import { ViewemployeeComponent } from 'src/app/modules/employee/viewemployee/viewemployee.component';
import { MatCardModule } from '@angular/material/card';
import { ViewpostComponent } from 'src/app/modules/posts/viewpost/viewpost.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { LoginComponent } from 'src/app/customer/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

// MDB Angular Free
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md'

import { SelectModule } from 'ng-uikit-pro-standard';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TaskersComponent } from 'src/app/components/taskers/taskers.component';
import { TeamComponent } from 'src/app/components/team/team.component';
import { HfooterComponent } from 'src/app/components/hfooter/hfooter.component';
import { ViewcustomerComponent } from 'src/app/modules/customer/viewcustomer/viewcustomer.component';
import { EditcustomerComponent } from 'src/app/modules/customer/editcustomer/editcustomer.component';
import { ServicesPageComponent } from 'src/app/components/services-page/services-page.component';
import { ContactUsComponent } from 'src/app/components/contact-us/contact-us.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { TaskerProfileComponent } from 'src/app/components/tasker-profile/tasker-profile.component';
import { EditadminsComponent } from 'src/app/modules/admin/editadmins/editadmins.component';
import { ViewadminsComponent } from 'src/app/modules/admin/viewadmins/viewadmins.component';
import { ServiceComponent } from 'src/app/components/services-page/service/service.component';
import { EmployeeprofileComponent } from 'src/app/employees/employeeprofile/employeeprofile.component';
import { AboutComponent } from 'src/app/components/about/about.component';
import { EmployeeNavbarComponent } from 'src/app/employees/employee-navbar/employee-navbar.component';
import { CustomerNavbarComponent } from 'src/app/customer/customer-navbar/customer-navbar.component';
import { BookingformComponent } from 'src/app/components/bookingform/bookingform.component';
@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    AdminComponent,
    CustomerComponent,
    EmployeeComponent,
    ViewpostComponent,
    AddEmployeeComponent,
    SignupComponent,
    LoginComponent,
    ViewemployeeComponent,
    HomeComponent,
    ServicesPageComponent,
    ServiceComponent,
    ContactUsComponent,
    TaskersComponent,
    TeamComponent,
    HfooterComponent,
    ViewcustomerComponent,
    EditcustomerComponent,
    NavbarComponent,
    EmployeeNavbarComponent,
    CustomerNavbarComponent,
    TaskerProfileComponent,
    EditadminsComponent,
    ViewadminsComponent,  
    EmployeeprofileComponent,
    AboutComponent,
    BookingformComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatDividerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule, SelectModule
  ]
})
export class DefaultModule { }
