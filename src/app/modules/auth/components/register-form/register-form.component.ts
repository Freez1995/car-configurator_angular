import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CustomSpinnerDirective } from 'src/app/modules/shared/directives/custom-spinner.directive';
import { AuthData, AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  viewProviders: [CustomSpinnerDirective],
})
export class RegisterFormComponent {
  @Input() isLoading: boolean = false;

  @Output() sendData: EventEmitter<AuthData> = new EventEmitter();

  public passwordShown = false;

  registerForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, this.passwordValidation]],
      passwordConfirm: ['', [Validators.required]],
    },
    { validators: this.matchPasswordValidation }
  );

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }

  sendRegistrationData() {
    if (this.email?.value && this.password?.value) {
      this.sendData.emit({
        email: this.email.value,
        password: this.password.value,
      });
    }
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
