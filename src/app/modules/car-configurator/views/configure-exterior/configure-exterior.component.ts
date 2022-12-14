import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';
import { ConfigurationSidebarPicker } from '../../components/configuration-sidebar-picker/configuration-sidebar-picker.component';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-configure-exterior',
  templateUrl: './configure-exterior.component.html',
  styleUrls: ['./configure-exterior.component.scss'],
})
export class ConfigureExteriorComponent {
  @ViewChild('configurationSidebarPickerComponent', { static: false })
  configuratorSidebarPickerComponent?: ConfigurationSidebarPicker;

  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  colors$ = this.carStoreService.colors$;
  wheels$ = this.carStoreService.wheels$;
  exteriors$ = this.carStoreService.exteriors$;

  constructor(
    private readonly carStoreService: CarStoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  handleToggleConfiguratorPicker(configurationPickerType: 'color' | 'wheels') {
    if (this.configuratorSidebarPickerComponent) {
      this.configuratorSidebarPickerComponent.configurationPickerType =
        configurationPickerType;
      this.configuratorSidebarPickerComponent.sidebarPickerShown = 'shown';
    }
  }

  onConfigurationChanged(configuration: SavedCarConfiguration) {
    this.carStoreService.setSelectedConfiguration(configuration);
  }

  navigateConfigureInterior() {
    this.router.navigate([`../${CarConfigRoutes.ConfiguratorInteriorPage}`], {
      relativeTo: this.activatedRoute,
    });
  }
}
