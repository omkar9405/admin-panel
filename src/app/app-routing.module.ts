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
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ViewemployeeComponent } from './modules/employee/viewemployee/viewemployee.component';
import { AuthGuard } from './_helper';
import { HomeComponent } from './components/home/home.component';
import { TaskersComponent } from './components/taskers/taskers.component';

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
    path:'login',
    component:LoginComponent
  },
  {
    path:'tasker',
    component:TaskersComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
{
    path:'app',
    component: DefaultComponent,canActivate: [AuthGuard],
    children:[{
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
    component: AdminComponent
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
    component: CustomerComponent
  },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
