import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith, Subscription } from 'rxjs';
import { AuthStoreService } from 'src/app/modules/auth/services/auth-store.service';
import { CarStoreService } from 'src/app/modules/car-configurator/services/car-store.service';
import { Routes } from '../../enums';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  currentRoute$ = this.carStoreService.currentRoute$;
  subscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly carStoreService: CarStoreService,
    private readonly authStoreSerivce: AuthStoreService
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

  handleSignOut() {
    this.authStoreSerivce.handleSignOut();
  }

  handleNavigateHome() {
    this.router.navigate([Routes.HomePage]);
  }

  handleNavigateCarSelector() {
    this.router.navigate([Routes.ConfiguratorCarSelectPage]);
  }
}
