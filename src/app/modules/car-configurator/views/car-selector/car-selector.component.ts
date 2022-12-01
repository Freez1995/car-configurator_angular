import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  isLoadingDetailsPageData$ = this.carStoreService.isLoadingDetailsPageData$;

  constructor(
    private carStoreService: CarStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carStoreService.getCarCollection().subscribe();
  }

  async onCarSelected(car: Car) {
    this.carStoreService.getDetailsPageData(car).subscribe(() => {
      this.router.navigate(['/configurator/view']);
    });
  }

  handleNavigateHome() {
    this.router.navigate(['']);
  }
}
