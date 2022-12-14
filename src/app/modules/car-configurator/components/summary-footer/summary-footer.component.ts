import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-summary-footer',
  templateUrl: './summary-footer.component.html',
  styleUrls: ['./summary-footer.component.scss'],
})
export class SummaryFooterComponent {
  @Input() selectedConfiguration?: SavedCarConfiguration;
  @Input() exteriorImages?: string[];
  @Input() isLoadingSavingConfiguration: boolean = false;
  @Output() configurationSave = new EventEmitter<SavedCarConfiguration>();

  handleConfigurationSave() {
    this.configurationSave.emit({
      ...this.selectedConfiguration!,
      carSideImage: this.exteriorImages![2],
      createdAt: Timestamp.now(),
    });
  }
}
