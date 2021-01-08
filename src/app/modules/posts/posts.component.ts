import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public router:Router,public route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  clicked()
  {
    this.router.navigate(['viewpost'],{relativeTo:this.route});
  }

}
