import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() isLoading: boolean = false;

  @Output() sendData: EventEmitter<AuthData> = new EventEmitter();

  public passwordShown = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  sendLoginData() {
    if (this.email?.value && this.password?.value) {
      this.sendData.emit({
        email: this.email.value,
        password: this.password.value,
      });
    }
  }
}
