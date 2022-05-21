import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostActivityComponent } from '../post-activity/post-activity.component';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post-login-page',
  templateUrl: './post-login-page.component.html',
  styleUrls: ['./post-login-page.component.css']
})
export class PostLoginPageComponent implements OnInit {
  fireStore = new FirebaseTSFirestore();
  posts:PostData[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onCreatePostClick(){
    this.dialog.open(PostActivityComponent);
  }

  getPosts(){
    this.fireStore.getCollection({
      path: ["Posts"],
      where: [
        //new Where("createId", "==", "fvFQlCYHqmVGiNOXL9mMXAE4aLp2"),
        new OrderBy("timestamp", "desc"),
        new Limit(10)
      ],
      onComplete:(result) =>{
        result.docs.forEach(
          doc => {
            let posts = <PostData>doc.data();
            this.posts.push(posts);
          }
        )
      },
      onFail: (err)=>{

      }
    })
  }
}

export interface PostData{
  comment?: string,
  createId?: string,
  imageUrl?: string,
}