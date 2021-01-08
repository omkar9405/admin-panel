import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { PostsComponent } from './modules/posts/posts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { EmployeeComponent } from './modules/employee/employee.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { ViewpostComponent } from './modules/posts/viewpost/viewpost.component';


const routes: Routes = [
  {
    path:'',
    component: DefaultComponent,
    children:[{
      path:'',
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
    component: EmployeeComponent
  },
  {
    path:'customer',
    component: CustomerComponent
  }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
