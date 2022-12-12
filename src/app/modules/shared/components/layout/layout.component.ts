import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth-service.service';
import { CarStoreService } from 'src/app/modules/car-configurator/services/car-store.service';
import { Routes } from '../../enums';
import { ErrorTransformPipe } from '../../pipes/error-transform.pipe';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  currentRoute$ = this.carStoreService.currentRoute$;
  subscription?: Subscription;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly errorTransform: ErrorTransformPipe,
    private readonly snackBar: MatSnackBar,
    private readonly carStoreService: CarStoreService
  ) {}

  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        startWith(this.router)
      )
      .subscribe((e) => {
        this.carStoreService.setCurrentRoute(e.url);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onLogout() {
    this.auth
      .handleSignOut()
      .then(() => {
        this.router.navigate([Routes.SignInPage]);
      })
      .catch((error) => {
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
      });
  }

  handleNavigateHome() {
    this.router.navigate([Routes.HomePage]);
  }

  handleNavigateCarSelector() {
    this.router.navigate([Routes.ConfiguratorCarSelectPage]);
  }
}
