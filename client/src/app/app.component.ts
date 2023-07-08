import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//____________________________ Fetch Users ___________________________________
export class AppComponent implements OnInit{
  title = 'client';
  Users:any;

  constructor(private http: HttpClient){}

  ngOnInit() {
    // this.http.get("http://localhost:5000/api/Users").subscribe(response=>{
    //   this.User = response;
    // },error=>{
    //   console.log(error);
    // })
    this.getUsers();
  }

  getUsers(){
    this.http.get("http://localhost:5000/api/Users").subscribe(response=>{
      console.log(response);
      this.Users = response;
    },error=>{
      console.log(error);
    })
  }

}
