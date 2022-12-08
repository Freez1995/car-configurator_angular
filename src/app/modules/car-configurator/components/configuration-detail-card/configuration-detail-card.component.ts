import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-configuration-detail-card',
  templateUrl: './configuration-detail-card.component.html',
  styleUrls: ['./configuration-detail-card.component.scss'],
})
export class ConfigurationDetailCardComponent {
  @Input() carImage?: string;
  @Input() carName?: string;
  @Input() carPrice?: number;
}
