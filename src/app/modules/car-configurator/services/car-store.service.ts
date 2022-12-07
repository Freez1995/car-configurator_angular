import { Injectable } from '@angular/core';
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
import { CarSelectService } from './car-select.service';

export interface CarConfigurationStore {
  carCollection: CarCollection[];
  isLoadingCarCollection: boolean;
  carCollectionError: string;
  colors: Color[];
  wheels: Wheels[];
  interiors: Interior[];
  exteriors: Exterior[];
  selectedConfiguration: SavedCarConfiguration;
  isLoadingDetailsPageData: boolean;
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
  isLoadingDetailsPageData: false,
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
  isLoadingDetailsPageData$ = this.select(
    (state) => state.isLoadingDetailsPageData
  );
  detailsPageDataError$ = this.select((state) => state.detailsPageDataError);

  currentRoute$ = this.select((state) => state.currentRoute);

  constructor(
    private carSelectService: CarSelectService,
    private errorTransform: ErrorTransformPipe
  ) {
    super(initialState);
  }

  getCarCollection() {
    this.setState({
      isLoadingCarCollection: true,
    });

    return this.carSelectService
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

  getDetailsPageData(car: Car) {
    this.setState({
      isLoadingDetailsPageData: true,
    });

    return forkJoin([
      this.carSelectService.getColorsByCarId(car.carId).pipe(take(1)),
      this.carSelectService.getWheelsByCarId(car.carId).pipe(take(1)),
      this.carSelectService.getInteriorByCarId(car.carId).pipe(take(1)),
      this.carSelectService.getImagesByCarId(car.carId).pipe(take(1)),
    ]).pipe(
      tap(([colors, wheels, interiors, exteriors]) => {
        this.setState({
          colors,
          wheels,
          interiors,
          exteriors,
          selectedConfiguration: {
            ...this.state.selectedConfiguration,
            color: colors[0],
            wheels: wheels[0],
            interior: interiors[0],
            car,
          },
          isLoadingDetailsPageData: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isLoadingDetailsPageData: false,
          detailsPageDataError:
            'Failed to load configuration details, please try again later.',
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

  setCurrentRoute(currentRoute: string) {
    this.setState({
      currentRoute: currentRoute,
    });
  }
}
