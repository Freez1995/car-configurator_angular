import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { Car } from 'src/app/modules/shared/models';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.scss'],
})
export class CarSelectorComponent implements OnInit {
  carCollection$ = this.carStoreService.carCollection$;
  isLoadingCarCollection$ = this.carStoreService.isLoadingCarCollection$;
  carCollectionError$ = this.carStoreService.carCollectionError$;

  isLoadingSelectedCarData$ = this.carStoreService.isLoadingSelectedCarData$;

  constructor(
    private readonly carStoreService: CarStoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carStoreService.getCarCollection().subscribe();
  }

  async onCarSelected(car: Car) {
    this.carStoreService
      .getSelectedCarData(car)
      .subscribe(([colors, wheels, interiors]) => {
        this.carStoreService.setSelectedConfiguration({
          documentId: '',
          color: colors[0],
          wheels: wheels[0],
          interior: interiors[0],
          car,
        });
        this.router.navigate([CarConfigRoutes.ConfiguratorViewPage], {
          relativeTo: this.activatedRoute,
        });
      });
  }

  handleNavigateHome() {
    this.router.navigate([CarConfigRoutes.HomePage]);
  }
}
