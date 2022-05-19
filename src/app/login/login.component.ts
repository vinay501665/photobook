import { Component, OnInit } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser = new SocialUser;

  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) =>{
      this.user = user;
      console.log(this.user);

    })
    
  }

  facebookSignin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleSignin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
