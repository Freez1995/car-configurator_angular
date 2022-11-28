import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Car, CarCollection } from 'src/app/modules/shared/models';
import SwiperCore, { Scrollbar, FreeMode } from 'swiper';

SwiperCore.use([FreeMode, Scrollbar]);

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardSliderComponent {
  @Input() carData: CarCollection[] = [];
  @Output() onCarSelect = new EventEmitter<Car>();

  emitSelectCarData(selectedCar: Car) {
    this.onCarSelect.emit(selectedCar);
  }
}
