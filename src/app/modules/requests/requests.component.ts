import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/_services/booking.service';
import { DatatableService } from 'src/app/_services/datatableservice/datatable.service';
import { TaskerService } from 'src/app/_services/tasker.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests:[];
  Taskers:[];
  id:'';
  constructor(
  public router:Router,
    private route: ActivatedRoute,
    private datatableservice: DatatableService,
    private bookingService:BookingService,
    private taskerService: TaskerService
  ) { }

  ngOnInit(): void {
    this.getBookings();
    this.getTaskers();
  }
  

  getBookings(){
   this.bookingService.findAll().subscribe((res: any) => {
   console.log("Request loaded successful");
   this.requests = res.map((key) => ({ ...key }));
   this.datatableservice.initTable('requests');
   console.log(this.requests);
   
 }, (err) => {
   console.log('Error while fetching data');
   console.error(err);
 });
}

view(id)
  {
  this.id=id;
    this.router.navigate(['viewrequest',id],{relativeTo:this.route});
  }

  delete(id)
  {
    this.bookingService.deleteRequest(id).subscribe((res: any) => {
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
    this.getBookings();
  }

getTaskers()
 {
  this.taskerService.gettaskerList().subscribe((res: any) => {
    console.log(res);
    this.Taskers = res.map((key) => ({ ...key }));
  }, (err) => {
    console.log('Error while fetching data');
    console.error(err);
  });
 }



 deleteid:'';
 deleteId(id){
this.deleteid=id;
 }
}
