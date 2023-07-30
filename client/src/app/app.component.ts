import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//____________________________ Fetch Users ___________________________________
export class AppComponent implements OnInit{
  title = 'Client APP';
  // Users:any;

  constructor(private http: HttpClient, private accountService: AccountService){}

  ngOnInit() {
    // this.http.get("http://localhost:5000/api/Users").subscribe(response=>{
    //   this.User = response;
    // },error=>{
    //   console.log(error);
    // })

    // this.getUsers();
    
    this.setCurrentUser();
  }

  //___________________ Geting All Users ______________________
  // getUsers(){
  //   this.http.get("http://localhost:5000/api/Users").subscribe(response=>{
  //     console.log(response);
  //     this.Users = response;
  //   },error=>{
  //     console.log(error);
  //   })
  // }


  //__________________ checking User in Local Storage _______________
  // check if  user is alredy exist in Local storage _____
  setCurrentUser() {
    const userStringy = localStorage.getItem('user');
    if (userStringy !== null) {
      const user: User = JSON.parse(userStringy); //convert to json  from stringyfy
      this.accountService.setCurrentUser(user);
    } else {
      this.accountService.setCurrentUser(null);
    }
  }
  
}
