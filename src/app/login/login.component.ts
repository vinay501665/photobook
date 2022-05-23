import { Component, OnInit } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import firebase from "firebase/app";
import "firebase/auth";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser = new SocialUser;
  firebaseTsAuth: FirebaseTSAuth;
  forgotPasswordInput:boolean = false;
  loginFlag: boolean = false;

  constructor(private socialAuthService: SocialAuthService, private route: Router) {
    this.firebaseTsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);

    })
    this.isloggedInForSignout();

    console.log("inside login");

  }

  facebookSignin() {
    console.log("inside facebook login");
    let provider = new firebase.auth.FacebookAuthProvider();
    console.log("inside facebook provider : "+provider);
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log("inside facebook login11");
    var credential = result.credential;
    console.log(credential);

    // The signed-in user info.
    var user = result.user;
    console.log(user);

  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
    //this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleSignin() {
   // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
   let provider = new firebase.auth.GoogleAuthProvider();
   firebase.auth().signInWithPopup(provider).then((result) => {
    
          var credential = result.credential;
          console.log(credential);

          // The signed-in user info.
          var user = result.user;
          console.log(user);
          location.reload();

        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          // ...
    });   
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  

  onRegister(registerEmail: HTMLInputElement, registerPassword: HTMLInputElement, registerConfirmPassword: HTMLInputElement) {
    console.log("inside register");
    let email = registerEmail.value;
    let registerPasswordValue = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;
    if (this.isNotEmpty(email) && this.isNotEmpty(registerPasswordValue) && this.isNotEmpty(confirmPassword)
     && this.stringMatch(registerPasswordValue, confirmPassword)) {
      console.log("inside register");
      this.firebaseTsAuth.createAccountWith(
        {
          email: email,
          password: registerPasswordValue,
          onComplete: (res) => {
            console.log("inside complete");
            alert("Account created successfully!!");
            registerEmail.value = "";
            registerPassword.value = "";
            registerConfirmPassword.value = "";
          },
          onFail: (err) => {
            alert("Failed to create the account!")
          }
        }
      );      
    }

  }

  onLogin(loginUsername: HTMLInputElement, loginPassword: HTMLInputElement){
    let username = loginUsername.value;
    let password = loginPassword.value;
    if(this.isNotEmpty(username) && this.isNotEmpty(password)){
      this.firebaseTsAuth.signInWith({
        email:username,
        password:password,
        onComplete: (userCredentials) => {
          var user = userCredentials.user
          location.reload();
        },
        onFail: (err) => {
          alert("User doesn't exist")
        }
      })
    }
    // firebase.auth().signInWithEmailAndPassword(username,password).then((userCredentials) => {
    //   var user = userCredentials.user

    //   alert("Logged in successfully!!")

    // }).catch((error) =>{
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   alert("User doesn't exist!!!")
    // });
  }

  onResetPassword(recoveryEmail:HTMLInputElement){
    let recovery = recoveryEmail.value;
    if(this.isNotEmpty(recovery)){
      this.firebaseTsAuth.sendPasswordResetEmail({
        email:recovery,
        onComplete:(err) =>{
          alert(`Reset email sent to ${recovery}`)
        }
      })
    }

  }

  loginPage(){
    this.forgotPasswordInput = false;
  }

  forgotPassword(){
    this.forgotPasswordInput = true;
  }

  isNotEmpty(input: string) {
    return input != null && input.length > 0;
  }

  stringMatch(input1: string, input2: string) {
    return input1 == input2;
  }

  isloggedInForSignout(){
    console.log("inside logout");
    console.log(this.firebaseTsAuth.isSignedIn);
    return this.firebaseTsAuth.isSignedIn;
  }
}
