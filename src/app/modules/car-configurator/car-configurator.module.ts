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
import { DetailsFormComponent } from './components/details-form/details-form.component';
import { ConfigurationDetailCardComponent } from './components/configuration-detail-card/configuration-detail-card.component';
import { PriceTransformPipe } from './pipes/price-transform.pipe';
import { FilterCarExteriorsPipe } from './pipes/filter-car-exteriors.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfigureExteriorComponent } from './views/configure-exterior/configure-exterior.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerItemComponent } from './components/drawer-item/drawer-item.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { WheelsPickerComponent } from './components/wheels-picker/wheels-picker.component';

@NgModule({
  declarations: [
    DetailsPageComponent,
    ConfiguratorHeaderComponent,
    CarSelectorComponent,
    CardSliderComponent,
    CarConfiguratorComponent,
    PriceContainerComponent,
    DetailsFormComponent,
    ConfigurationDetailCardComponent,
    PriceTransformPipe,
    FilterCarExteriorsPipe,
    ConfigureExteriorComponent,
    DrawerItemComponent,
    ColorPickerComponent,
    WheelsPickerComponent,
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
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
  ],
  providers: [ErrorTransformPipe, PriceTransformPipe, FilterCarExteriorsPipe],
})
export class CarConfiguratorModule {}
