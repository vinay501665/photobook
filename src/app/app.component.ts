import { Component } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { SignOutService } from '../app/sign-out.service'
import { of } from 'rxjs'
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Photobook';
  auth = new FirebaseTSAuth();
  firestore: FirebaseTSFirestore;
  userHasProfile: boolean= true;
  emailNotVerified:boolean = false;
  userDocument!: UserDocument;

  constructor(private signOutService: SignOutService, private route:Router){
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
    return this.auth.isSignedIn();
  }

  onLogoutClick(){
    this.auth.signOut();
    this.route.navigate(["login"]);
  }

  getUserProfile(){
    console.log("inside get profile");
    this.firestore.listenToDocument({
      name:"Getting values",
      path:["Users", "QTZVFFtgIm14tPKzveUi"],
      onUpdate:(result) =>{
        this.userDocument = <UserDocument>result.data();
        console.log(this.userDocument.publicName);
        this.userDocument.publicName;
        this.userHasProfile = result.exists;
        if(this.userHasProfile){
          this.route.navigate(["postLog"]);
        }
      }
    });
  }
}

export interface UserDocument{
  publicName: string;
}