import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent {
  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  detailsPageDataError$ = this.carStoreService.detailsPageDataError$;

  exteriors$ = this.carStoreService.exteriors$;

  constructor(
    private readonly carStoreService: CarStoreService,
    private readonly router: Router
  ) {}

  handleNavigateHome() {
    this.router.navigate([CarConfigRoutes.HomePage]);
  }
}
