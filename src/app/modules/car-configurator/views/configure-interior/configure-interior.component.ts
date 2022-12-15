import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';
import { ConfigurationSidebarPicker } from '../../components/configuration-sidebar-picker/configuration-sidebar-picker.component';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-configure-interior',
  templateUrl: './configure-interior.component.html',
  styleUrls: ['./configure-interior.component.scss'],
})
export class ConfigureInteriorComponent {
  @ViewChild('configurationSidebarPickerComponent', { static: false })
  configuratorSidebarPickerComponent?: ConfigurationSidebarPicker;

  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  interiors$ = this.carStoreService.interiors$;

  constructor(
    private readonly carStoreService: CarStoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  handleToggleConfiguratorPicker() {
    if (this.configuratorSidebarPickerComponent) {
      this.configuratorSidebarPickerComponent.configurationPickerType =
        'interior';
      this.configuratorSidebarPickerComponent.sidebarPickerShown = 'shown';
    }
  }

  onConfigurationChanged(configuration: SavedCarConfiguration) {
    this.carStoreService.setSelectedConfiguration(configuration);
  }
  navigateSummary() {
    this.router.navigate([`../${CarConfigRoutes.ConfiguratorSummaryPage}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
