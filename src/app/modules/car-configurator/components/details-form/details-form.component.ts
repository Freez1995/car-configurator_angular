import { Component, Input } from '@angular/core';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { Exterior, SavedCarConfiguration } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss'],
})
export class DetailsFormComponent {
  @Input() selectedConfiguration?: SavedCarConfiguration;
  @Input() exteriors?: Exterior[];
  @Input() editLinkShown?: boolean;

  carConfigRoutes = CarConfigRoutes;

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
