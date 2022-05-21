import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-activity',
  templateUrl: './post-activity.component.html',
  styleUrls: ['./post-activity.component.css']
})
export class PostActivityComponent implements OnInit {
  selectedImageFile!: File;
  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;
  storage:FirebaseTSStorage

  constructor(private matDialogRef: MatDialogRef<PostActivityComponent>) { 
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
            comment:comment,
            createId: this.auth.getAuth().currentUser?.uid,
            imageUrl: downloadUrl,
            timestamp: FirebaseTSApp.getFirestoreTimestamp()
          },
          onComplete: (docId) => {
            this.matDialogRef.close();
          }
        })
      }
      
    })

  }
}
