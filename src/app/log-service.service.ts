import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  constructor(private http: HttpClient) { }

  postLog(user: string){
    return this.http.post("http://localhost:8080/photobook/log", user, {responseType:'text' as 'json'});
  }
}
