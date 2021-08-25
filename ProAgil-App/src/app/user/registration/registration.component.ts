import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
          password : ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword : ['', [Validators.required, Validators.minLength(4)]]
        },
        {validator: this.compararSenhas})
      });
    }

    compararSenhas(fb: FormGroup){
      const confirmSenhaCtrl = fb.get('confirmPassword');
      const passwordCtrl = fb.get('password');

      if(confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors){
        if(passwordCtrl.value !== confirmSenhaCtrl.value){
          passwordCtrl.setErrors({mismatch: true});
        }
        else{
          confirmSenhaCtrl.setErrors(null);
        }
      }
    }

    cadastrarUsuario(){
      if(this.registerForm.valid){
                    //criando um objerto
        this.user = Object.assign({passwords: this.registerForm.get('passwords.password').value}, 
                                             this.registerForm.value);
        
      }
    }
  }