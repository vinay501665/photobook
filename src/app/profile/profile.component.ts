import { Component, Input, OnInit } from '@angular/core';
import { SignOutService } from '../sign-out.service';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() show:boolean | undefined;
  signOut: boolean | undefined

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor(private signOutService: SignOutService) {
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
   }

  ngOnInit(): void {
    this.signOut =  this.signOutService.getSignOutValue();
   console.log(this.signOut);
  }

  onClickCon(name: HTMLInputElement){
    let nameVal = name.value;
    this.firestore.create({
      path:["Users"],
      data:{
        publicName: nameVal
      },
      onComplete: (docId) => {
        alert("profile created")
        name.value="";

      },
      onFail: (err) =>{

      }
    })
  }

}
