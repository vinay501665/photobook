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
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleSignin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
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
          console.log(user);
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
