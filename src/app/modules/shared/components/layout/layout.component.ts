import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth-service.service';
import { ErrorTransformPipe } from '../../pipes/error-transform.pipe';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  currentRoute = this.router.url;
  subscription?: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private errorTransform: ErrorTransformPipe,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.currentRoute = e.url;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
