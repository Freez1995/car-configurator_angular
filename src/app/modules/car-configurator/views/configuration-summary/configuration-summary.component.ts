import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-configuration-summary',
  templateUrl: './configuration-summary.component.html',
  styleUrls: ['./configuration-summary.component.scss'],
})
export class ConfigurationSummaryComponent {
  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  exteriors$ = this.carStoreService.exteriors$;

  constructor(
    private readonly carStoreService: CarStoreService,
    private router: Router
  ) {}

  handleSaveConfiguration(configuration: SavedCarConfiguration) {
    if (configuration.documentId) {
      this.carStoreService.updateCarConfiguration(
        configuration.documentId,
        configuration
      );
      this.router.navigate(['']);
      return;
    }
    this.carStoreService.saveCarConfiguration(configuration);
    this.router.navigate(['']);
  }
}
