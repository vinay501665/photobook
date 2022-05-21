import { Component, Input, OnInit } from '@angular/core';
import { SignOutService } from '../sign-out.service';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';

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

  constructor(private signOutService: SignOutService, private route:Router) {
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
   }

  ngOnInit(): void {
    this.signOut =  this.signOutService.getSignOutValue();
   console.log(this.signOut);
  }

  onClickCon(name: HTMLInputElement){
    let nameVal = name.value;
    
    let uid = (this.auth.getAuth().currentUser?.uid != undefined)? this.auth.getAuth().currentUser?.uid : null;
    this.firestore.create({
      path:["Users", uid],
      data:{
        publicName: nameVal
      },
      onComplete: (docId) => {
        alert("profile created")
        name.value="";
        this.route.navigate(["postLog"]);
      },
      onFail: (err) =>{

      }
    })
  }

}
