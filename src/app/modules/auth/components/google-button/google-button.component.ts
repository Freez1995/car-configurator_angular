import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorTransformPipe } from 'src/app/modules/shared/pipes/error-transform.pipe';
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
    private errorTransform: ErrorTransformPipe,
    private snackBar: MatSnackBar
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
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
      });
  }
}
