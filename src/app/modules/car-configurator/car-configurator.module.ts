import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarConfiguratorRoutingModule } from './car-configurator-routing.module';
import { DetailsPageComponent } from './views/details-page/details-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfiguratorHeaderComponent } from './components/configurator-header/configurator-header.component';
import { ErrorTransformPipe } from '../shared/pipes/error-transform.pipe';
import { SwiperModule } from 'swiper/angular';
import { CarSelectorComponent } from './views/car-selector/car-selector.component';
import { CardSliderComponent } from './components/card-slider/card-slider.component';
import { CarConfiguratorComponent } from './views/car-configurator/car-configurator.component';
import { PriceContainerComponent } from './components/price-container/price-container.component';

@NgModule({
  declarations: [
    DetailsPageComponent,
    ConfiguratorHeaderComponent,
    CarSelectorComponent,
    CardSliderComponent,
    CarConfiguratorComponent,
    PriceContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarConfiguratorRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    SwiperModule,
  ],
  providers: [ErrorTransformPipe],
})
export class CarConfiguratorModule {}
