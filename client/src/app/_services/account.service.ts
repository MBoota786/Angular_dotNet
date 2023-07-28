import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//___ 1. Services _____________
//services  are  used to     store data  or   to    integrated apis

//___ 2, services are  injectable ____
//means  services can be  injected in other    Components or Services

//___ 3. Services are  SingleTon _______
//data we stored in  services   dos'nt  destory     --> untile our application closed down

//---- note  ----
// Component are different    ---. when we  move component to component they  destroied

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5000/api/';

  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl + 'account/login' , model);
  }

}
