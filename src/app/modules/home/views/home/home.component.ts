import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SavedCarConfiguration } from 'src/app/modules/shared/models/SavedConfiguration';
import { ErrorTransformPipe } from 'src/app/modules/shared/pipes/error-transform.pipe';
import { CarConfigurationService } from '../../services/car-configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = true;
  error?: string;
  savedConfigurations: SavedCarConfiguration[] = [];
  subscription?: Subscription;

  constructor(
    private configurationService: CarConfigurationService,
    private snackBar: MatSnackBar,
    private errorTransform: ErrorTransformPipe
  ) {}

  ngOnInit(): void {
    this.subscription = this.configurationService
      .getCarConfigurations()
      .valueChanges({ idField: 'documentId' })
      .subscribe(
        (carConfigurations) => {
          this.savedConfigurations = carConfigurations;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
            duration: 5000,
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
