import { AfterViewInit,ViewChild,Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';




@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{

  customers:[];
  id='';
  customerDto = {
    "firstName":"",
    "lastName":"",
    "address":[{
      "street":"",
      "city":"",
      "state":"",
      "zipcode":""
    }],
    "mobile": 0,
    "gender":"",
    "email": "",
    "dob":"",
    "password": "",
    "createdAt":"",
    "feedback":[]
   }
  constructor(public router:Router,
    private datatableservice: DatatableService,
    public route:ActivatedRoute,
    private authenticationService: CustomerService) {
  }

  ngOnInit() {
   this.getlist(); 
  }
 getlist()
 {
  this.authenticationService.getcustomerList().subscribe((res: any) => {
    console.log(res);
    this.customers = res.map((key) => ({ ...key }));
    this.datatableservice.initTable('customers');
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
 }
  

  edit(id)
  {
    this.id=id;
    this.router.navigate(['editcustomer',id],{relativeTo:this.route});
  }
  view(id)
  {
    this.id=id;
    this.router.navigate(['viewcustomer',id],{relativeTo:this.route});
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
  refresh()
{
  this.datatableservice.destroy();
  this.getlist();
}
}


