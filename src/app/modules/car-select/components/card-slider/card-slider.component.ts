import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Car } from 'src/app/modules/shared/models/Car';
import SwiperCore, { Scrollbar, FreeMode } from 'swiper';

SwiperCore.use([FreeMode, Scrollbar]);

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardSliderComponent {
  @Input() carData: Car[] = [];
}
