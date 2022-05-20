import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignOutService {
  signOut:boolean | undefined;

  constructor() { }

  updateLoggedInValue(value:Observable<boolean>){
    value.subscribe((val) => {
      this.signOut = val;
    })
  }

  getSignOutValue(){
    console.log(this.signOut);
    return this.signOut;
  }
}
