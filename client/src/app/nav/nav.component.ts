import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit{
  model:any={};
  // loggedIn:boolean = false;
  currentUser$! : Observable<User|null>;


  //Inject service in  Component  --> like   .net to add   Services in Controller
  constructor(private accountServices:AccountService){}

  ngOnInit(): void { 
    // this.getCurrentUser();
    this.currentUser$ = this.accountServices.currentUser$;
  }

  login(){
    //console.log(this.model);
    //____ Absorver _________
    //absorver is Lazzy    it dosn't do anything  untile we   subscribe it
    this.accountServices.login(this.model).subscribe(response=>{
      console.log(response);
      // this.loggedIn = true;

    },error=>{
      console.log(error);
    })
  }

  logout(){
    this.accountServices.logout();
    // this.loggedIn = false;
  }

  //____ Don't logout with referesh ____
  //for this we are  getting  data from localstoredge in  app.ts Component
  //setting it to   account services  in  (setCurrentUser)
  //and in   navComponent we are  getting this  currentUser by Subscribe  if its  exist other wise  will not loggin

  // getCurrentUser(){
  //   //________ this  is not   Http or Api  Request Data   ---> this is localStorege data
  //   this.accountServices.currentUser$.subscribe(user=>{
  //     this.loggedIn = !!user;
  //   },error=>{
  //     console.log(error);
  //   });
  // }

}
