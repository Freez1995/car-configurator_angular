import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-configurator-header',
  templateUrl: './configurator-header.component.html',
  styleUrls: ['./configurator-header.component.scss'],
})
export class ConfiguratorHeaderComponent {
  @Input() selectedConfiguration?: SavedCarConfiguration;

  currentRoute$ = this.carStoreService.currentRoute$;

  constructor(
    private readonly router: Router,
    private readonly carStoreService: CarStoreService
  ) {}

  handleNavigateBack() {
    this.router.navigate([CarConfigRoutes.ConfiguratorCarSelectPage]);
  }

  handleNavigateConfigureExterior() {
    this.router.navigate([CarConfigRoutes.ConfiguratorExteriorPage]);
  }

  handleDelete() {
    this.router.navigate([CarConfigRoutes.HomePage]);
  }
}
