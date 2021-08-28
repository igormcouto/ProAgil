import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { User } from './../../_models/User';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  modelLogin: any = {};

  constructor(private authService: AuthService
    ,public router: Router
    ,private  toastr: ToastrService) { 

}

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    this.authService.login(this.modelLogin)
        .subscribe(
          () => {
            this.toastr.show('Login realizado com sucesso!');
            this.router.navigate(['/dashboard']);
          },
          error => {
            this.toastr.error('Falha ao fazer o login!');
          }
        )
  }

}
