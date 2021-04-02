import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminsService } from 'src/app/_services/admins.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { EditadminsComponent } from './editadmins/editadmins.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admins:[];
  AdminID;
  id='';
  constructor(public router:Router,
    private route: ActivatedRoute,

    private datatableservice: DatatableService,
    private authenticationService: AdminsService) {
  }

  ngOnInit() {
   this.getlist(); 
  }
 getlist()
 {
  this.authenticationService.getadminList().subscribe((res: any) => {
    this.admins = res.map((key) => ({ ...key }));
    this.datatableservice.initTable('Admins');
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
 }

 OnchnageId(id){
   this.AdminID=id;
 }

 
  edit(id)
  {
    this.AdminID=id;
  }
  view(id)
  {
  this.AdminID=id;
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
  
 
 }
