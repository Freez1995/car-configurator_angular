import { Injectable } from '@angular/core';
import { catchError, forkJoin, tap, throwError } from 'rxjs';
import { Store } from '../../shared/classes/Store.class';
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
  constructor(
    private carSelectService: CarSelectService,
    private errorTransform: ErrorTransformPipe
  ) {
    super(initialState);
  }

  getInitialData(carId: string) {
    return forkJoin([
      this.carSelectService.getColorsByCarId(carId),
      this.carSelectService.getWheelsByCarId(carId),
      this.carSelectService.getInteriorByCarId(carId),
      this.carSelectService.getImagesByCarId(carId),
    ]).pipe(
      tap(([colors, wheels, interiors, carImages]) => {
        this.setState({
          colors,
          wheels,
          interiors,
          carImages,
          isLoading: false,
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
    const currentState = this.state.selectedConfiguration;
    this.setState({
      selectedConfiguration: { ...currentState, ...carProps },
    });
  }
}
