import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdminsService } from 'src/app/_services/admins.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { DataTableDirective } from 'angular-datatables';
import { AfterViewInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit, OnDestroy,OnInit {

  admins:[];
  id:'';
  constructor(public router:Router,
    private route: ActivatedRoute,
    private datatableservice: DatatableService,
    private authenticationService: AdminsService,
    private ref: ChangeDetectorRef) {
      
  }
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  ngOnInit() {
    // this.ref.detach();
    // setInterval(() => {
    //   this.datatableservice.destroy();
    // this.ref.detectChanges();
    this.getlist();
    // }, 5000);
    
  
  }
 getlist()
 {
  
  this.authenticationService.getadminList().subscribe((res: any) => {
    this.admins = res.map((key) => ({ ...key }));
    this.datatableservice.initTable('Admins');
    this.dtTrigger.next();
  }, (err) => {
    console.log('Error while fetching data: admin');
    console.error(err);
  });
 }
 
  edit(id)
  {
    this.id=id;
    this.router.navigate(['editadmin',id],{relativeTo:this.route});
  }
  view(id)
  {
  this.id=id;
    this.router.navigate(['viewadmin',id],{relativeTo:this.route});
  }
  delete(id)
  {
    this.authenticationService.delete(id).subscribe((res: any) => {
      this.datatableservice.destroy();
      this.getlist();
    }, (err) => {
      console.log('Error while deleting ');
      console.error(err);
    });
  }

  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }
 
 }


