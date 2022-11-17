import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/modules/shared/components/snack-bar/snack-bar.component';
import { AuthData, AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public isLoading = false;

  constructor(
    private firebaseAuth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  handleLoginUser({ email, password }: AuthData) {
    this.isLoading = true;
    this.firebaseAuth
      .handleSignIn({ email, password })
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.isLoading = false;
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 4000,
          data: error,
        });
      });
  }
}
