import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-after-post',
  templateUrl: './after-post.component.html',
  styleUrls: ['./after-post.component.css']
})
export class AfterPostComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goback(){
    this.route.navigate(["postLog"]);

  }
}
