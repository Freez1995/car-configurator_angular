import { Component } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  registerForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [this.validatePasswordSymbol,
      this.validatePasswordNumber,
      this.validatePasswordLowercaseLetter,
      this.validatePasswordUppercaseLetter]],
    passwordConfirm: ['']
  })

  constructor(private fb: FormBuilder) { }

  onSubmit(){
    //console.log(this.registerForm.value)
    //console.log(this.registerForm.controls.email.hasError('email'))
    //console.log(this.registerForm.controls.email.errors)
    console.log(this.registerForm.controls.password.errors)
  }

  log(value:any){
    console.log(value)
  }

  validatePasswordSymbol(control: FormControl): ValidationErrors | boolean{
    const pattern = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
    return (pattern.test(control.value) || {passwordCheckSymbol : 'Password must contain at least 1 special character'});
  }

  validatePasswordNumber(control: FormControl): ValidationErrors | boolean{
    const pattern = /(?=.*?[0-9])/;
    return (pattern.test(control.value)|| {passwordCheckNumber : 'Password must contain at least 1 number'});
  }

  validatePasswordLowercaseLetter(control: FormControl): ValidationErrors | boolean{
    const pattern = /(?=.*?[a-z])/;
    return (pattern.test(control.value) || {passwordCheckLowercase : 'Password must contain at least 1 lowercase letter'});
  }

  validatePasswordUppercaseLetter(control: FormControl): ValidationErrors | boolean{
    const pattern = /(?=.*?[A-Z])/;
    return (pattern.test(control.value) || {passwordCheckUppercase : 'Password must contain at least 1 capital letter'});
  }
}
