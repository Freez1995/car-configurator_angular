import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import {
  Car,
  CarCollection,
  Color,
  Exterior,
  Interior,
  Wheels,
} from 'src/app/modules/shared/models';
import { ErrorTransformPipe } from 'src/app/modules/shared/pipes/error-transform.pipe';
import { CarSelectService } from '../../services/car-select.service';

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
    const car = data;
    const color = this.handleGetColorsByCarId(data.carId);
    const wheels = this.handleGetWheelsByCarId(data.carId);
    const interiors = this.handleGetInteriorByCarId(data.carId);
    const carImages = this.handleGetImagesByCarId(data.carId);
  }

  handleGetColorsByCarId(carId: string) {
    let selectedCarColors = <Color[]>[];
    this.subscription = this.carSelectService
      .getColorsByCarId(carId)
      .valueChanges({ idField: 'colorId' })
      .subscribe({
        next: (carColors) => {
          selectedCarColors = carColors;
        },
        error: (error) => {
          this.handleServiceError(error);
        },
      });
    return selectedCarColors;
  }

  handleGetWheelsByCarId(carId: string) {
    let selectedCarWheels = <Wheels[]>[];
    this.subscription = this.carSelectService
      .getWheelsByCarId(carId)
      .valueChanges({ idField: 'wheelsId' })
      .subscribe({
        next: (carWheels) => {
          selectedCarWheels = carWheels;
        },
        error: (error) => {
          this.handleServiceError(error);
        },
      });
    return selectedCarWheels;
  }

  handleGetInteriorByCarId(carId: string) {
    let selectedCarInteriors = <Interior[]>[];
    this.subscription = this.carSelectService
      .getInteriorByCarId(carId)
      .valueChanges({ idField: 'interiorId' })
      .subscribe({
        next: (carInterior) => {
          selectedCarInteriors = carInterior;
        },
        error: (error) => {
          this.handleServiceError(error);
        },
      });
    return selectedCarInteriors;
  }

  handleGetImagesByCarId(carId: string) {
    let selectedCarImages = <Exterior[]>[];
    this.subscription = this.carSelectService
      .getImagesByCarId(carId)
      .valueChanges({ idField: 'exteriorId' })
      .subscribe({
        next: (carImages) => {
          selectedCarImages = carImages;
        },
        error: (error) => {
          this.handleServiceError(error);
        },
      });
    return selectedCarImages;
  }

  handleServiceError(error: string) {
    this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
      duration: 5000,
    });
  }
}
