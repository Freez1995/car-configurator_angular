import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth-service.service';
import { CarStoreService } from 'src/app/modules/car-configurator/services/car-store.service';
import { Routes } from 'src/app/modules/shared/enums';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';
import { HomeCarStoreService } from '../../services/home-car-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoadingSelectedCarData$ = this.carStoreService.isLoadingSelectedCarData$;
  savedConfigurations$ = this.homeCarStore.savedConfigurations$;
  isSavedConfigurationsLoading$ =
    this.homeCarStore.isSavedConfigurationsLoading$;
  savedConfigurationsError$ = this.homeCarStore.savedConfigurationsError$;

  constructor(
    private readonly router: Router,
    private readonly carStoreService: CarStoreService,
    private readonly homeCarStore: HomeCarStoreService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.homeCarStore.getSavedCarConfigurations(this.auth.userId).subscribe();
  }

  onDocumentDeleted(documentId: string) {
    this.homeCarStore.deleteDocumentById(documentId);
  }

  onConfigurationEdit(savedConfiguration: SavedCarConfiguration) {
    this.carStoreService
      .getSelectedCarData(savedConfiguration.car)
      .subscribe(() => {
        this.carStoreService.setSelectedConfiguration(savedConfiguration);
        this.router.navigate([Routes.ConfiguratorSummaryPage]);
      });
  }

  handleNavigateCarSelector() {
    this.router.navigate([Routes.ConfiguratorCarSelectPage]);
  }
}
