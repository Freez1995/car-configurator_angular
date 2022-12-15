import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { UserAuthCredentials } from '../../models/UserAuthCredentials';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  @Input() isSignUpLoading?: boolean;
  @Input() isGoogleAuthenticationLoading?: boolean;
  @Output() formSubmited = new EventEmitter<UserAuthCredentials>();
  @Output() googleSignUp = new EventEmitter();

  carConfigRoutes = CarConfigRoutes;
  public passwordShown = false;

  registerForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, this.passwordValidation]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validators: this.matchPasswordValidation }
  );

  constructor(private readonly fb: FormBuilder) {}

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }

  handleFormSubmited() {
    if (this.email?.value && this.password?.value) {
      this.formSubmited.emit({
        email: this.email.value,
        password: this.password.value,
      });
    }
  }

  handleGoogleSignUp() {
    this.googleSignUp.emit();
  }

  passwordValidation(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    return password && pattern.test(password)
      ? null
      : {
          passwordError:
            'Password must be at least 8 characters long, must contain 1 number, uppecase and lowercase letter.',
        };
  }

  matchPasswordValidation(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (password?.value !== passwordConfirm?.value) {
      passwordConfirm?.setErrors({
        ...passwordConfirm.errors,
        passwordConfirmError: 'Passwords must match',
      });
    }

    return password?.value &&
      passwordConfirm?.value &&
      password.value === passwordConfirm.value
      ? null
      : { passwordConfirmError: 'Passwords must match' };
  }
}
