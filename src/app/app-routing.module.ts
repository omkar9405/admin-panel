import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { PostsComponent } from './modules/posts/posts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { ViewpostComponent } from './modules/posts/viewpost/viewpost.component';
import { AddEmployeeComponent } from './modules/employee/add-employee/add-employee.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './customer/login/login.component';
import { ViewemployeeComponent } from './modules/employee/viewemployee/viewemployee.component';
import { AuthGuard } from './_helper';
import { HomeComponent } from './components/home/home.component';
import { TaskersComponent } from './components/taskers/taskers.component';
import { LoginemployeeComponent } from './employees/loginemployee/loginemployee.component';
import { EmployeeprofileComponent } from './employees/employeeprofile/employeeprofile.component';
import { CustomerprofileComponent } from './customer/customerprofile/customerprofile.component';
import { ViewcustomerComponent } from './modules/customer/viewcustomer/viewcustomer.component';
import { EditcustomerComponent } from './modules/customer/editcustomer/editcustomer.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminAuthGuard } from './_helper/adminAuth.guard';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ServicesPageComponent } from './components/services-page/services-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TaskerProfileComponent } from './components/tasker-profile/tasker-profile.component';
import { ViewadminsComponent } from './modules/admin/viewadmins/viewadmins.component';
import { EditadminsComponent } from './modules/admin/editadmins/editadmins.component';
import { TaskerAuthGuard } from './_helper/taskerAuth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceComponent } from './components/services-page/service/service.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:  'home',
    pathMatch:  'full'
  },
  {
    path:'home',
    component:HomeComponent
    
  },
  {
    path:'customerlogin',
    component:LoginComponent
  },
  {
    path:'tasker',
    component:TaskersComponent
  },
{
    path:'app',
    component: DefaultComponent,
children:[
        {
           path:'dashboard',
            component: DashboardComponent
        },
          {
            path:'posts',
            component: PostsComponent,
              children:[{
                      path: 'viewpost',
                      component: ViewpostComponent
                        }]
          },
          {
            path:'admin',
            component: AdminComponent,
            children:[
              {
                path:'viewadmin/:id',
                component: ViewadminsComponent
              },
              {
                path:'editadmin/:id',
                component: EditadminsComponent
              }
            ]
          },
          
  
  {
    path:'employee',
    component: EmployeeComponent,
    children:[{
      path: 'add-employee',
      component: AddEmployeeComponent
    },
    {
      path:'view-employee',
      component: ViewemployeeComponent
    }]
  },
  {
    path:'customer',
    component: CustomerComponent,
    children:[
    {
      path:'viewcustomer/:id',
      component: ViewcustomerComponent
    },
    {
      path:'editcustomer/:id',
      component: EditcustomerComponent
    }
    ]
  },
  ]
  },
  {
    path:'employeeLogin',
    component:LoginemployeeComponent
  },
  {
    path:'employeeProfile',canActivate:[TaskerAuthGuard],
    component:EmployeeprofileComponent
  },
  {
    path:'customerProfile',canActivate:[AuthGuard],
    component:CustomerprofileComponent
  },
  {
    path:'adminLogin',
    component:AdminLoginComponent
  },
  {
    path:'contactUs',
    component:ContactUsComponent
  },
  {
    path:'servicePage/:city',
    component:ServicesPageComponent, 
  },
  {
    path:'services/:city/:service',
    component:ServiceComponent
  },
  {
    path:'taskerProfile',
    component:TaskerProfileComponent 
  }
 

];

@NgModule({
  imports: [ReactiveFormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
