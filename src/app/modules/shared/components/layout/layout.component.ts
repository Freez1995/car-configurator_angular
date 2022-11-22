import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth-service.service';
import { ErrorTransformPipe } from '../../pipes/error-transform.pipe';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private errorTransform: ErrorTransformPipe,
    private snackBar: MatSnackBar
  ) {}

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

  ngOnInit(): void {}
}
