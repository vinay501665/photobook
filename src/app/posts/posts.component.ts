import { Component, Input, OnInit } from '@angular/core';
import { PostData } from '../post-login-page/post-login-page.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from '../comments/comments.component';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() postData!: PostData;
  fireStore = new FirebaseTSFirestore();
  creatorName!: string;
  storage = new FirebaseTSStorage();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAuthorInfo();
  }

  getAuthorInfo(){
    this.fireStore.getDocument({
      path: ["Users", this.postData?.createId],
      onComplete:(result) =>{
        let userDoc = result.data();
        this.creatorName = userDoc['publicName'];
      }
    })
  }

  onComment(){
    this.dialog.open(CommentsComponent);
  }

  fileDownload(url:string){
    this.storage.downloadToLocalStorage(url);
  }

}
