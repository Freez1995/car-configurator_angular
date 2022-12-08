import { Component, OnInit } from '@angular/core';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-configuration-summary',
  templateUrl: './configuration-summary.component.html',
  styleUrls: ['./configuration-summary.component.scss'],
})
export class ConfigurationSummaryComponent {
  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  exteriors$ = this.carStoreService.exteriors$;

  constructor(private readonly carStoreService: CarStoreService) {}
}
