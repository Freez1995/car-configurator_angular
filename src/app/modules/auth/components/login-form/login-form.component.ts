import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { UserAuthCredentials } from '../../models/UserAuthCredentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() isSignInLoading?: boolean;
  @Input() isGoogleAuthenticationLoading?: boolean;
  @Output() formSubmited = new EventEmitter<UserAuthCredentials>();
  @Output() googleSignIn = new EventEmitter();

  carConfigRoutes = CarConfigRoutes;
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
    this.googleSignIn.emit();
  }
}
