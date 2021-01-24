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
import { SignupComponent } from 'src/app/signup/signup.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
//import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule, SelectModule } from 'ng-uikit-pro-standard'
// MDB Angular Free
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md'

import { SelectModule } from 'ng-uikit-pro-standard';
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
    LoginComponent
    
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
