import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  auth = new FirebaseTSAuth();
  constructor(private route: Router) { }

  ngOnInit(): void {
    if(this.auth.isSignedIn() && !this.auth.getAuth().currentUser?.emailVerified){
      this.auth.sendVerificationEmail();
    }else{
      this.route.navigateByUrl("/")
    }
  }

  onResendClick(){
    this.auth.sendVerificationEmail();
    alert("Your request for resend verification email has been recieved. Please verify and try login again !!");
    this.auth.signOut();
    this.route.navigate(["login"]);
  }
}
