import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//_______ Reactive Xtension Javascript ___________
import { ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';


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
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  //__________ Login __________
  // login(model:any){
  //   return this.http.post(this.baseUrl + 'account/login' , model);
  // }


  //__________ Absarvable  + RxJS __________
  //used when we want to do  with data  some thing with data  befor Subscribing
  //Ex ::  Transfer data   ... Map , Filter , reduce  
  login(model:any){
    return this.http.post(this.baseUrl + 'account/login' , model).pipe(
      map((response:object)=>{
        const user = response as User;
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.currentUserSource.next(user);
        }
      })
    );
  }
  

  setCurrentUser(user: User | null){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }



}
