import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthCredentials } from '../../models/UserAuthCredentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() isSignInLoading?: boolean;
  @Input() isGoogleAuthenticationLoading: boolean = false;
  @Output() formSubmited = new EventEmitter<UserAuthCredentials>();
  @Output() googleSignedIn = new EventEmitter();

  public passwordShown = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private readonly fb: FormBuilder) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleFormSubmited() {
    if (this.email?.value && this.password?.value) {
      this.formSubmited.emit({
        email: this.email.value,
        password: this.password.value,
      });
    }
  }

  handleGoogleSignedIn() {
    this.googleSignedIn.emit();
  }
}
