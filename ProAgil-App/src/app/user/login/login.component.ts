import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../_models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  user: User;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log();
  }

}
