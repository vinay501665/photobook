import { Component, Input, OnInit } from '@angular/core';
import { SignOutService } from '../sign-out.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signOut: boolean | undefined

  constructor(private signOutService: SignOutService) { }

  ngOnInit(): void {
    
   this.signOut =  this.signOutService.getSignOutValue();
   console.log(this.signOut);
  }

}
