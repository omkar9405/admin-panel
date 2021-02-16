import { Component, OnInit } from '@angular/core';
import { TaskerService } from 'src/app/_services/tasker.service';

@Component({
  selector: 'app-taskers',
  templateUrl: './taskers.component.html',
  styleUrls: ['./taskers.component.css']
})
export class TaskersComponent implements OnInit {
taskers:[];
  constructor(
    private getAPI:TaskerService
  ) { }

  ngOnInit(): void {
    this.getTaskers();
  }
  getTaskers(){
    this.getAPI.gettaskerList().subscribe((res: any) => {
      console.log("Taskers loaded successful");
      this.taskers = res.map((key) => ({ ...key }));
    }, (err) => {
      console.log('Error while fetching data');
      console.error(err);
    });
  }

}
