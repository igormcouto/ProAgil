import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from './../../_models/User';
import { AuthService } from './../../_services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(private authService: AuthService
             ,public router: Router
             ,public fb: FormBuilder
             ,private  toastr: ToastrService) { 

    }

    ngOnInit() {
      this.validation();
    }

    validation(){
      this.registerForm = this.fb.group({
        fullName : ['', Validators.required],
        email : ['', [Validators.required, Validators.email]],
        userName : ['', Validators.required],
        passwords: this.fb.group({
          password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
          confirmPassword : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
        },
        {validator: this.compararSenhas})
      });
    }

    cadastrarUsuario(){
      if(this.registerForm.valid){
        this.user = Object.assign({passwords: this.registerForm.get('passwords.password').value},this.registerForm.value); //criando um objeto

        console.log(this.user);

        this.authService.register(this.user).subscribe(
          () => {
            this.toastr.success('Cadastro Realizado');
            this.router.navigate(['/user/login']);
          },
          error => {
            console.log(error);
            const erro = error.error;
            if(erro.length > 0 ){
              erro.forEach(element => {
                switch (element.code) {
                  case 'DuplicateUserName':
                this.toastr.error(`Cadastro Duplicado! O usuário ${this.registerForm.get('userName').value} já existe!`);
                break;
                default:
                this.toastr.error(`Erro no Cadastro! Error: ${element.code}`);
                break;
                }
              });
            }else{
              this.toastr.error(`Erro no Cadastro! Error: ${erro}`);
            }
          }          
        )
      }
    }

    compararSenhas(fb: FormGroup) {
      const confirmSenhaCtrl = fb.get('confirmPassword');
      if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors) {
        if (fb.get('password').value !== confirmSenhaCtrl.value) {
          confirmSenhaCtrl.setErrors({ mismatch: true });
        } else {
          confirmSenhaCtrl.setErrors(null);
        }
      }
    }
  }