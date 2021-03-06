import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostLoginPageComponent } from '../post-login-page/post-login-page.component';

@Component({
  selector: 'app-post-activity',
  templateUrl: './post-activity.component.html',
  styleUrls: ['./post-activity.component.css']
})
export class PostActivityComponent implements OnInit {
  selectedImageFile!: File;
  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;
  storage:FirebaseTSStorage;
  dialog!: MatDialog;

  constructor(private matDialogRef: MatDialogRef<PostActivityComponent>, private route: Router) { 
    this.firestore = new FirebaseTSFirestore;
    this.auth = new FirebaseTSAuth;
    this.storage = new FirebaseTSStorage;
  }

  ngOnInit(): void {
  }

  onPhotoSelected(photoSelector: HTMLInputElement){
    if(photoSelector !=null && photoSelector != undefined){
    this.selectedImageFile = photoSelector.files[0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL( this.selectedImageFile);
    fileReader.addEventListener("loadend", ev => {
      let readableString = fileReader?.result?.toString();
      let preview = <HTMLImageElement>document.getElementById("post-preview-image");
      preview.src = readableString!;
    })
    }
  }

  onPostClick(descriptionInput: HTMLTextAreaElement){
    let comment = descriptionInput.value;
    let postId = this.firestore.genDocId();
    this.storage.upload({
      uploadName:"upload image",
      path:["Posts", postId, "image"],
      data: {
        data: this.selectedImageFile
      },
      onComplete:(downloadUrl) => {
        this.firestore.create({
          path: ["Posts",postId],
          data: {
            id: 1,
            comment:comment,
            creator: this.auth.getAuth().currentUser?.uid,
            imageUrl: downloadUrl,
            timestamp: FirebaseTSApp.getFirestoreTimestamp()
          },
          onComplete: (docId) => {
            this.matDialogRef.close();
            this.route.navigate(["afterpost"]);
            
          }
        })
      }
      
    })

  }
}
