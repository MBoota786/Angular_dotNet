import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  model:any={};
  loggedIn:boolean = false;
  //Inject service in  Component  --> like   .net to add   Services in Controller
  constructor(private account:AccountService){}

  ngOnInit(): void { 
  }

  login(){
    //console.log(this.model);
    //____ Absorver _________
    //absorver is Lazzy    it dosn't do anything  untile we   subscribe it
    this.account.login(this.model).subscribe(response=>{
      console.log(response);
      this.loggedIn = true;

    },error=>{
      console.log(error);
    })
  }

  logout(){
    this.loggedIn = false;
  }
}
