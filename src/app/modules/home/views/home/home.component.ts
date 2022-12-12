import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth-service.service';
import { CarStoreService } from 'src/app/modules/car-configurator/services/car-store.service';
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
    private router: Router,
    private carStoreService: CarStoreService,
    private homeCarStore: HomeCarStoreService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.homeCarStore.getSavedCarConfigurations(this.auth.userId).subscribe();
  }

  handleDeleteDocumentById(documentId: string) {
    this.homeCarStore.deleteDocumentById(documentId);
  }

  handleGetSavedConfigurationData(savedConfiguration: SavedCarConfiguration) {
    this.carStoreService
      .getSelectedCarData(savedConfiguration.car)
      .subscribe(() => {
        this.carStoreService.setSelectedConfiguration(savedConfiguration);
        this.router.navigate(['configurator/configuration-summary']);
      });
  }

  handleNavigateCarSelector() {
    this.router.navigate(['configurator']);
  }
}
