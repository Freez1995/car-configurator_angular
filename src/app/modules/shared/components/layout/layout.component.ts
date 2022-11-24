import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth-service.service';
import { NavigationBarOptions } from '../../models/ISharedService';
import { ErrorTransformPipe } from '../../pipes/error-transform.pipe';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  configureCarButtonShown = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private errorTransform: ErrorTransformPipe,
    private sharedService: SharedService<NavigationBarOptions>,
    private snackBar: MatSnackBar
  ) {
    this.sharedService.subscribe(
      (item) => (this.configureCarButtonShown = item.isButtonShown)
    );
  }

  onLogout() {
    this.auth
      .handleSignOut()
      .then(() => {
        this.router.navigate(['sign-in']);
      })
      .catch((error) => {
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
      });
  }

  handleNavigateHome() {
    this.router.navigate(['home']);
  }

  handleNavigateCarSelector() {
    this.router.navigate(['select-car']);
  }
}
