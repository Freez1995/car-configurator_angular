import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-container',
  templateUrl: './price-container.component.html',
  styleUrls: ['./price-container.component.scss'],
})
export class PriceContainerComponent {
  @Input() containerDirection = 'column';
  @Input() totalPrice = 0;
}
