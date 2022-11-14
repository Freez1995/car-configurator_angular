import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent {

  registerForm = this.fb.nonNullable.group({
    email: ['',  [Validators.email, Validators.required]],
    password: ['', [this.passwordValidation,
      Validators.required]],
    passwordConfirm: ['', [Validators.required]]
  })
  public passwordShown = false

  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm')
  }

  constructor(private fb: FormBuilder, private auth: AuthService){}

  onSubmit(){
    this.auth.handleSignUp(this.email!, this.password!)
  }

  onLogout(){
    this.auth.handleSignOut()
  }

  passwordValidation(control: FormControl): ValidationErrors | boolean {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    return (pattern.test(control.value)) || {passwordError: 'Password must be at least 8 characters long, must contain 1 number, uppecase and lowercase letter.'}
  }

  matchPasswordValidation(control: FormControl , controlConfirm: FormControl) : void | boolean {
    return control?.value !== controlConfirm?.value || this.passwordConfirm?.setErrors({passwordConfirmError: 'Passwords must match'})
  }
}
