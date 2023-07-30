import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  Users:any; //sending this to child component child

  constructor(private http:HttpClient){}
  
  ngOnInit(): void {
    this.getUsers();
  }

  //_________ Show hide Register View ____________________
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  //_________ Get Users List and show in Child Components ____________________
  getUsers(){
    this.http.get("http://localhost:5000/api/Users").subscribe(users=>this.Users = users);
  }

  //__________ Cancel Register  Values coming from  Child Comp ___________
  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
} 
