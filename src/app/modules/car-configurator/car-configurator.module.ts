import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarConfiguratorRoutingModule } from './car-configurator-routing.module';
import { DetailsPageComponent } from './views/details-page/details-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfiguratorHeaderComponent } from './components/configurator-header/configurator-header.component';

@NgModule({
  declarations: [DetailsPageComponent, ConfiguratorHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    CarConfiguratorRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
})
export class CarConfiguratorModule {}
