import { Component } from '@angular/core';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-car-configurator',
  templateUrl: './car-configurator.component.html',
})
export class CarConfiguratorComponent {
  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  currentRoute$ = this.carStoreService.currentRoute$;

  constructor(private readonly carStoreService: CarStoreService) {}
}
