import { Component, OnInit } from '@angular/core';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  fireStore = new FirebaseTSFirestore();
  posts:PostData[] = [];
  auth = new FirebaseTSAuth();
  timelineYear: number[] = [];

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    let uid = this.auth.getAuth().currentUser?.uid;
    this.fireStore.getCollection({
      path: ["Posts"],
      where: [
        new Where("creator", "==", uid),
        new OrderBy("timestamp", "desc"),
        new Limit(100)
      ],
      onComplete:(result) =>{
        result.docs.forEach(
          doc => {
            let posts = <PostData>doc.data();
            this.posts.push(posts);
            this.getTimeline(this.posts);
            //console.log(new Date(this.posts[0].timestamp?.seconds*1000));
          }
        )
      },
      onFail: (err)=>{
        console.log("inside posts error")

      }
    })
  }

  getTimeline(posts: PostData[]){
    posts.forEach((post) =>{
     
      console.log( new Date(post.timestamp?.seconds*1000).getFullYear());
      this.timelineYear.indexOf(new Date(post.timestamp?.seconds*1000).getFullYear()) === -1 ? this.timelineYear.push(new Date(post.timestamp?.seconds*1000).getFullYear()) : console.log("Item already exists in array");
    });    
  }

  onBackClick(){
    this.route.navigate(["postLog"]);
  }

}

export interface PostData{
  comment?: string,
  creator?: string,
  imageUrl?: string,
  id?: number,
  timestamp?: firebase.default.firestore.Timestamp
}