import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-home-saved-configurations',
  templateUrl: './home-saved-configurations.component.html',
  styleUrls: ['./home-saved-configurations.component.scss'],
})
export class HomeSavedConfigurationsComponent {
  @Input() savedConfigurations: SavedCarConfiguration[] = [];

  @Output() documentDeleted = new EventEmitter<string>();
  @Output() configurationEdit = new EventEmitter<SavedCarConfiguration>();

  handleDocumentDeleted(documentId: string) {
    if (documentId.length) {
      this.documentDeleted.emit(documentId);
    }
  }

  handleConfigurationEdit(savedConfiguration: SavedCarConfiguration) {
    this.configurationEdit.emit(savedConfiguration);
  }
}
