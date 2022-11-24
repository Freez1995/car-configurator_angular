import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/modules/shared/models/Car';
import { ErrorTransformPipe } from 'src/app/modules/shared/pipes/error-transform.pipe';
import { CarCollectionService } from '../../services/car-collection.service';

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.scss'],
})
export class CarSelectorComponent implements OnInit, OnDestroy {
  carCollection: Car[] = [];
  isLoading = true;
  subscription?: Subscription;

  constructor(
    private carCollectionService: CarCollectionService,
    private snackBar: MatSnackBar,
    private errorTransform: ErrorTransformPipe
  ) {}

  ngOnInit(): void {
    this.subscription = this.carCollectionService.carCollection
      .valueChanges({ idField: 'carId' })
      .subscribe({
        next: (carCollectionData) => {
          this.carCollection = carCollectionData;
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
            duration: 5000,
          });
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
