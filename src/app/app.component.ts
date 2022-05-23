import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { SignOutService } from '../app/sign-out.service'
import { of } from 'rxjs'
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { LogServiceService } from './log-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Photobook';
  auth = new FirebaseTSAuth();
  firestore: FirebaseTSFirestore;
  userHasProfile: boolean= false;
  emailNotVerified:boolean = false;
  userDocument!: UserDocument;

  constructor(private signOutService: SignOutService, private route:Router, private logService: LogServiceService){
    this.firestore = new FirebaseTSFirestore();
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState({
          whenSignedIn: user => {
           // console.log("inside the auth constructor");
             // alert("logged in");
          },
          whenSignedOut: user =>{
            //alert("logged out");

          },
          whenSignedInAndEmailVerified: user =>{
            this.getUserProfile();
          },
          whenSignedInAndEmailNotVerified: user =>{
            this.emailNotVerified = true;
            this.route.navigate(["emailVerify"])
          },
          whenChanged: user => {

          }
        })
      }
    )
  }

  loggedIn(){
    const signOutVal = of(this.auth.isSignedIn());
    this.signOutService.updateLoggedInValue(signOutVal);
    this.logService.postLog(this.auth.getAuth().currentUser?.uid);
    return this.auth.isSignedIn();
  }

  onLogoutClick(){
    this.auth.signOut();
    this.route.navigate(["login"]);
  }

  getUserProfile(){
    console.log("inside get profile");
    let uid = this.auth.getAuth().currentUser?.uid;
    console.log("inside get profile : "+uid);
    this.firestore.listenToDocument({
      name:"Getting values",
      path:["Users", uid],
      onUpdate:(result) =>{
        if(<UserDocument>result!.data() != undefined){
        this.userDocument = <UserDocument>result!.data();
        }
        console.log("/////////////////   "+this.userDocument.publicName);
        this.userDocument.publicName;
        this.userHasProfile = result.exists;
        console.log("/////////////////   "+this.userHasProfile);
        if(this.userHasProfile){
          console.log("inside get user profile")
          this.route.navigate(["postLog"]);
        }
      }
    });
  }
}

export interface UserDocument{
  publicName: string;
}