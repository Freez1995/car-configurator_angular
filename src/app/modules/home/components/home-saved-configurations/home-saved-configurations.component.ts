import { Component, Input, OnInit } from '@angular/core';
import { SavedCarConfiguration } from 'src/app/modules/shared/models/SavedConfiguration';

@Component({
  selector: 'app-home-saved-configurations',
  templateUrl: './home-saved-configurations.component.html',
  styleUrls: ['./home-saved-configurations.component.scss'],
})
export class HomeSavedConfigurationsComponent {
  @Input() savedConfigurations: SavedCarConfiguration[] = [];

  constructor() {}
}
