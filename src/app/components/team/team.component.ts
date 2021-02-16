import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/_services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team:[]
  constructor(public router:Router,
    public route:ActivatedRoute,
    private authenticationService: TeamService) {
      this.getTeam();
     }
  
  
  ngOnInit(): void {
  }
  getTeam(){
    this.authenticationService.getteamList().subscribe((res: any) => {
      this.team = res.map((key) => ({ ...key }));
      console.log('Team Loaded Successfull');
    }, (err) => {
      console.log('Error while fetching data');
      console.error(err);
    });
  }

}
