import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-car-configurator',
  templateUrl: './car-configurator.component.html',
})
export class CarConfiguratorComponent implements OnInit {
  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  currentRoute = this.router.url;
  subscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly carStoreService: CarStoreService
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
}
