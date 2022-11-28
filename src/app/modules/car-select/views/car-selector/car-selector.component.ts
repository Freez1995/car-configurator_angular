import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Car, CarCollection } from 'src/app/modules/shared/models';
import { ErrorTransformPipe } from 'src/app/modules/shared/pipes/error-transform.pipe';
import { CarSelectService } from '../../services/car-select.service';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.scss'],
})
export class CarSelectorComponent implements OnInit, OnDestroy {
  carCollection: CarCollection[] = [];
  isLoading = true;
  subscription?: Subscription;

  constructor(
    private carSelectService: CarSelectService,
    private carStoreService: CarStoreService,
    private snackBar: MatSnackBar,
    private errorTransform: ErrorTransformPipe
  ) {}

  ngOnInit(): void {
    this.subscription = this.carSelectService
      .getCarCollection()
      .valueChanges({ idField: 'carId' })
      .subscribe({
        next: (carCollectionData) => {
          this.carCollection = carCollectionData;
          this.isLoading = false;
        },
        error: (error) => {
          this.handleServiceError(error);
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async handleCarSelect(data: Car) {
    this.carStoreService.setSelectedConfiguration({ car: data });
  }

  handleServiceError(error: string) {
    this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
      duration: 5000,
    });
  }
}
