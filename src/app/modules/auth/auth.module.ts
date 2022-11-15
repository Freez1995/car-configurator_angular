import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    RegisterFormComponent,
    RegisterComponent,
    GoogleButtonComponent,
    LoginFormComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [RegisterComponent],
})
export class AuthModule {}
