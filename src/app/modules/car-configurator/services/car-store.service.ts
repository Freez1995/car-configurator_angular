import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, forkJoin, take, tap, throwError } from 'rxjs';
import { Store } from '../../shared/classes/store.class';
import {
  Car,
  CarCollection,
  Color,
  Exterior,
  Interior,
  SavedCarConfiguration,
  Wheels,
} from '../../shared/models';
import { ErrorTransformPipe } from '../../shared/pipes/error-transform.pipe';
import { CarActionsService } from './car-actions.service';

export interface CarConfigurationStore {
  carCollection: CarCollection[];
  isLoadingCarCollection: boolean;
  carCollectionError: string;
  colors: Color[];
  wheels: Wheels[];
  interiors: Interior[];
  exteriors: Exterior[];
  selectedConfiguration: SavedCarConfiguration;
  isLoadingSelectedCarData: boolean;
  detailsPageDataError: string;
  currentRoute: string;
}

const initialState: CarConfigurationStore = {
  carCollection: [],
  isLoadingCarCollection: false,
  carCollectionError: '',
  colors: [],
  wheels: [],
  interiors: [],
  exteriors: [],
  selectedConfiguration: <SavedCarConfiguration>{},
  isLoadingSelectedCarData: false,
  detailsPageDataError: '',
  currentRoute: '',
};

@Injectable({
  providedIn: 'root',
})
export class CarStoreService extends Store<CarConfigurationStore> {
  carCollection$ = this.select((state) => state.carCollection);
  isLoadingCarCollection$ = this.select(
    (state) => state.isLoadingCarCollection
  );
  carCollectionError$ = this.select((state) => state.carCollectionError);

  colors$ = this.select((state) => state.colors);
  wheels$ = this.select((state) => state.wheels);
  interiors$ = this.select((state) => state.interiors);
  exteriors$ = this.select((state) => state.exteriors);

  selectedConfiguration$ = this.select((state) => state.selectedConfiguration);
  isLoadingSelectedCarData$ = this.select(
    (state) => state.isLoadingSelectedCarData
  );
  detailsPageDataError$ = this.select((state) => state.detailsPageDataError);

  currentRoute$ = this.select((state) => state.currentRoute);

  constructor(
    private carActionsService: CarActionsService,
    private errorTransform: ErrorTransformPipe,
    private snackBar: MatSnackBar
  ) {
    super(initialState);
  }

  getCarCollection() {
    this.setState({
      isLoadingCarCollection: true,
    });

    return this.carActionsService
      .getCarCollection()
      .valueChanges({ idField: 'carId' })
      .pipe(
        tap((carCollection) => {
          this.setState({
            carCollection,
            isLoadingCarCollection: false,
          });
        }),
        catchError((error) => {
          this.setState({
            carCollectionError:
              'Failed to load configuration page, please try again later.',
            isLoadingCarCollection: false,
          });
          return throwError(
            () => new Error(this.errorTransform.transform(error))
          );
        })
      );
  }

  getSelectedCarData(car: Car) {
    this.setState({
      isLoadingSelectedCarData: true,
    });

    return forkJoin([
      this.carActionsService.getColorsByCarId(car.carId).pipe(take(1)),
      this.carActionsService.getWheelsByCarId(car.carId).pipe(take(1)),
      this.carActionsService.getInteriorByCarId(car.carId).pipe(take(1)),
      this.carActionsService.getImagesByCarId(car.carId).pipe(take(1)),
    ]).pipe(
      tap(([colors, wheels, interiors, exteriors]) => {
        this.setState({
          colors,
          wheels,
          interiors,
          exteriors,
          isLoadingSelectedCarData: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isLoadingSelectedCarData: false,
          detailsPageDataError:
            'Failed to load configuration details, please try again later.',
        });
        return throwError(
          () => new Error(this.errorTransform.transform(error))
        );
      })
    );
  }

  saveCarConfiguration(selectedConfiguration: SavedCarConfiguration) {
    this.carActionsService
      .saveCarConfiguration(selectedConfiguration)
      .then(() =>
        this.snackBar.open('Configuration successfully saved', 'Cancel', {
          duration: 5000,
        })
      )
      .catch((error) =>
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        })
      );
  }

  updateCarConfiguration(
    documentId: string,
    selectedConfiguration: SavedCarConfiguration
  ) {
    this.carActionsService
      .updateCarConfiguration(documentId, selectedConfiguration)
      .then(() =>
        this.snackBar.open('Configuration successfully updated', 'Cancel', {
          duration: 5000,
        })
      )
      .catch((error) =>
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        })
      );
  }

  setSelectedConfiguration(carProps: Partial<SavedCarConfiguration>) {
    this.setState({
      selectedConfiguration: {
        ...this.state.selectedConfiguration,
        ...carProps,
      },
    });
  }

  setCurrentRoute(currentRoute: string) {
    this.setState({
      currentRoute: currentRoute,
    });
  }
}
