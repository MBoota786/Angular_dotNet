import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  model:any ={};
  @Input() users : any = {};
  @Output() toggleRegisterMode= new EventEmitter<boolean>();

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
    this.toggleRegisterMode.emit(false);
  }

}
