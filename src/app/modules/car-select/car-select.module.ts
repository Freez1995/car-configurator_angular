import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarSelectorComponent } from './views/car-selector/car-selector.component';
import { CardSliderComponent } from './components/card-slider/card-slider.component';
import { CarSelectRoutingModule } from './car-select-routing.module';
import { ErrorTransformPipe } from '../shared/pipes/error-transform.pipe';
import { SwiperModule } from 'swiper/angular';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CarSelectorComponent, CardSliderComponent],
  imports: [
    CommonModule,
    CarSelectRoutingModule,
    MatButtonModule,
    SwiperModule,
  ],
  providers: [ErrorTransformPipe],
})
export class CarSelectModule {}
