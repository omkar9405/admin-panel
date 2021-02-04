import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layout/default/default.module';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { MDBBootstrapModule, DropdownModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './_helper';
import { HomeComponent } from './components/home/home.component';
import { TaskersComponent } from './components/taskers/taskers.component';
import { TeamComponent } from './components/team/team.component';
import { HfooterComponent } from './components/hfooter/hfooter.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskersComponent,
    TeamComponent,
    HfooterComponent,
   
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
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
