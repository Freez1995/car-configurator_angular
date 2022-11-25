import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-home-saved-configurations',
  templateUrl: './home-saved-configurations.component.html',
  styleUrls: ['./home-saved-configurations.component.scss'],
})
export class HomeSavedConfigurationsComponent {
  @Input() savedConfigurations: SavedCarConfiguration[] = [];

  @Output() onDeleteDocumentById = new EventEmitter<string>();

  constructor() {}

  getConfigurationDocumentId(documentId: string) {
    if (documentId.length) {
      this.onDeleteDocumentById.emit(documentId);
    }
  }
}
