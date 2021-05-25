import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/_services/booking.service';
import { TaskerService } from 'src/app/_services/tasker.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests:[];
  Taskers:[];
  constructor(
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
   console.log(this.requests);
   
 }, (err) => {
   console.log('Error while fetching data');
   console.error(err);
 });
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

}
