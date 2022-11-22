import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTransformPipe } from 'src/app/modules/shared/pipes/error-transform.pipe';
import { UserAuthCredentials } from '../../models/UserAuthCredentials';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isLoading = false;

  constructor(
    private firebaseAuth: AuthService,
    private router: Router,
    private errorTransform: ErrorTransformPipe,
    private snackBar: MatSnackBar
  ) {}

  handleRegisterUser({ email, password }: UserAuthCredentials) {
    this.isLoading = true;
    this.firebaseAuth
      .handleSignUp({ email, password })
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.isLoading = false;
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
      });
  }
}
