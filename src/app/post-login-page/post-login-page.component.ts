import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostActivityComponent } from '../post-activity/post-activity.component';

@Component({
  selector: 'app-post-login-page',
  templateUrl: './post-login-page.component.html',
  styleUrls: ['./post-login-page.component.css']
})
export class PostLoginPageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreatePostClick(){
    this.dialog.open(PostActivityComponent);
  }
}
