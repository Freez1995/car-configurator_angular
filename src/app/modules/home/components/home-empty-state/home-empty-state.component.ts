import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/modules/shared/components/snack-bar/snack-bar.component';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-home-empty-state',
  templateUrl: './home-empty-state.component.html',
  styleUrls: ['./home-empty-state.component.scss'],
})
export class HomeEmptyStateComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onLogout() {
    this.auth
      .handleSignOut()
      .then(() => {
        this.router.navigate(['sign-in']);
      })
      .catch((error) => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: 4000,
          data: error,
        });
      });
  }
}
