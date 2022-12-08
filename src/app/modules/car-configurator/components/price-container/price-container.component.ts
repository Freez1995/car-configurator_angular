import { Component, Input } from '@angular/core';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-price-container',
  templateUrl: './price-container.component.html',
  styleUrls: ['./price-container.component.scss'],
})
export class PriceContainerComponent {
  @Input() containerDirection = 'column';
  @Input() selectedConfiguration?: SavedCarConfiguration;

  getTotalPrice() {
    let totalPrice = 0;
    if (this.selectedConfiguration) {
      const { car, color, wheels, interior } = this.selectedConfiguration;
      totalPrice +=
        car.carPrice +
        color.colorPrice +
        wheels.wheelsPrice +
        interior.interiorPrice;
      return totalPrice;
    }
    return totalPrice;
  }
}
