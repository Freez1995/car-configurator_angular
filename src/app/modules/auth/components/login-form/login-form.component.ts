import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthnData } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm = this.fb.nonNullable.group({
    email: ['',  [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  })
  public passwordShown = false

  @Output() onSubmit: EventEmitter<AuthnData> = new EventEmitter()
  sendLoginData(){
    if(this.email?.value && this.password?.value){
      this.onSubmit.emit({email: this.email.value, password: this.password.value})
    }
  }

  get email(){
    return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  constructor(private fb: FormBuilder) { }

}
