import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from 'src/app/_services/admins.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admins:[];
  id:'';
  constructor(public router:Router,
    private route: ActivatedRoute,
    private datatableservice: DatatableService,
    private authenticationService: AdminsService,
    private ref: ChangeDetectorRef) {
      
  }
  
  
  ngOnInit() {
    this.getlist();
  }
 getlist()
 {
  
  this.authenticationService.getadminList().subscribe((res: any) => {
    this.admins = res.map((key) => ({ ...key }));

  }, (err) => {
    console.log('Error while fetching data: admin');
    console.error(err);
  },
  () => {
    //Complete
    this.datatableservice.destroy;
    this.ref.detectChanges();
    this.datatableservice.initTable('Admins');
});
 }
 
 add()
 {
   this.router.navigate(['newadmin'],{relativeTo:this.route});
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
      this.refresh();
    }, (err) => {
      console.log('Error while deleting ');
      console.error(err);
    });
  }

  refresh()
{
  this.datatableservice.destroy();
  this.getlist();
}
 
 
 }


