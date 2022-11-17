import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/modules/shared/components/snack-bar/snack-bar.component';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
})
export class GoogleButtonComponent {
  @Input() label = '';
  @Input() isLoading = false;

  constructor(
    private firebaseAuth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  handleOnSubmit() {
    this.isLoading = true;
    this.firebaseAuth
      .handleGoogleAuthentication()
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
