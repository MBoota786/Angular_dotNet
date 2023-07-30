import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  model:any ={};
  @Input() usersFromHomeComponents : any = {};  //coming from 
  @Output() cancelRegister= new EventEmitter<boolean>();

  constructor(){}

  ngOnInit(): void {    
  }

  //______________ Register _________________
  register(){
    console.log(this.model);
  }

  //______________ Cancel _________________
  cancel(){
    // console.log('canceled');
    this.cancelRegister.emit(false);
  }

}
