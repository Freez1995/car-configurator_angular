import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap, throwError } from 'rxjs';
import { Store } from '../../shared/classes/store.class';
import { SavedCarConfiguration } from '../../shared/models';
import { ErrorTransformPipe } from '../../shared/pipes/error-transform.pipe';
import { CarConfigurationService } from './car-configuration.service';

export interface HomeCarStore {
  savedConfigurations: SavedCarConfiguration[];
  isSavedConfigurationLoading: boolean;
  savedConfigurationsError: string;
  deleteConfigurationSuccessful: string;
}

const initialState: HomeCarStore = {
  savedConfigurations: [],
  isSavedConfigurationLoading: false,
  savedConfigurationsError: '',
  deleteConfigurationSuccessful: '',
};

@Injectable({
  providedIn: 'root',
})
export class HomeCarStoreService extends Store<HomeCarStore> {
  savedConfigurations$ = this.select((state) => state.savedConfigurations);
  isSavedConfigurationsLoading$ = this.select(
    (state) => state.isSavedConfigurationLoading
  );
  savedConfigurationsError$ = this.select(
    (state) => state.savedConfigurationsError
  );

  constructor(
    private readonly carConfigurationService: CarConfigurationService,
    private readonly errorTransform: ErrorTransformPipe,
    private readonly snackBar: MatSnackBar
  ) {
    super(initialState);
  }

  getSavedCarConfigurations(userId: string) {
    this.setState({
      isSavedConfigurationLoading: true,
    });
    return this.carConfigurationService
      .getCarConfigurations(userId)
      .valueChanges({ idField: 'documentId' })
      .pipe(
        tap((savedConfigurations) => {
          this.setState({
            savedConfigurations,
            isSavedConfigurationLoading: false,
          });
        }),
        catchError((error) => {
          this.setState({
            savedConfigurationsError:
              'Failed to load saved configurations, please try again later.',
            isSavedConfigurationLoading: false,
          });
          return throwError(
            () => new Error(this.errorTransform.transform(error))
          );
        })
      );
  }

  deleteDocumentById(documentId: string) {
    return this.carConfigurationService
      .deleteDocumentById(documentId)
      .then(() =>
        this.snackBar.open('Configuration successfully deleted.', 'Cancel', {
          duration: 5000,
        })
      )
      .catch((error) =>
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        })
      );
  }
}
