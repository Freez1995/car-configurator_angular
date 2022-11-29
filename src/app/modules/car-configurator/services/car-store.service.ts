import { Injectable } from '@angular/core';
import { catchError, forkJoin, take, tap, throwError } from 'rxjs';
import { Store } from '../../shared/classes/store.class';
import {
  Color,
  Exterior,
  Interior,
  SavedCarConfiguration,
  Wheels,
} from '../../shared/models';
import { ErrorTransformPipe } from '../../shared/pipes/error-transform.pipe';
import { CarSelectService } from './car-select.service';

export interface CarConfigurationStore {
  colors: Color[];
  wheels: Wheels[];
  interiors: Interior[];
  carImages: Exterior[];
  selectedConfiguration: SavedCarConfiguration;
  isLoading: boolean;
}

const initialState: CarConfigurationStore = {
  colors: [],
  wheels: [],
  interiors: [],
  carImages: [],
  selectedConfiguration: <SavedCarConfiguration>{},
  isLoading: true,
};

@Injectable({
  providedIn: 'root',
})
export class CarStoreService extends Store<CarConfigurationStore> {
  selectedConfiguration$ = this.select((state) => state.selectedConfiguration);
  colors$ = this.select((state) => state.colors);
  wheels$ = this.select((state) => state.wheels);
  interiors$ = this.select((state) => state.interiors);
  carImages$ = this.select((state) => state.carImages);
  isLoading$ = this.select((state) => state.isLoading);

  constructor(
    private carSelectService: CarSelectService,
    private errorTransform: ErrorTransformPipe
  ) {
    super(initialState);
  }

  getInitialData(carId: string) {
    return forkJoin([
      this.carSelectService.getColorsByCarId(carId).pipe(take(1)),
      this.carSelectService.getWheelsByCarId(carId).pipe(take(1)),
      this.carSelectService.getInteriorByCarId(carId).pipe(take(1)),
      this.carSelectService.getImagesByCarId(carId).pipe(take(1)),
    ]).pipe(
      tap(([colors, wheels, interiors, carImages]) => {
        this.setState({
          colors,
          wheels,
          interiors,
          carImages,
          isLoading: false,
        });
        this.setSelectedConfiguration({
          color: colors[0],
          wheels: wheels[0],
          interior: interiors[0],
        });
      }),
      catchError((error) => {
        this.setState({
          isLoading: false,
        });
        return throwError(
          () => new Error(this.errorTransform.transform(error))
        );
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
}
