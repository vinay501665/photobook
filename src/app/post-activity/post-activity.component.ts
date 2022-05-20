import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-activity',
  templateUrl: './post-activity.component.html',
  styleUrls: ['./post-activity.component.css']
})
export class PostActivityComponent implements OnInit {
  selectedImageFile!: File;

  constructor() { }

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
}
