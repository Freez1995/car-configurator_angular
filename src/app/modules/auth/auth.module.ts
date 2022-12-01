import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './views/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ErrorTransformPipe } from '../shared/pipes/error-transform.pipe';

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
    AuthRoutingModule,
    MatSnackBarModule,
  ],
  exports: [RegisterComponent, LoginComponent],
  providers: [ErrorTransformPipe],
})
export class AuthModule {}
