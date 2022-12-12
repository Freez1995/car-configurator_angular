import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Car, CarCollection, Interior } from 'src/app/modules/shared/models';
import SwiperCore, { Scrollbar, FreeMode, Navigation } from 'swiper';
import { EventsParams, SwiperComponent } from 'swiper/angular';

SwiperCore.use([FreeMode, Scrollbar, Navigation]);

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardSliderComponent {
  @Input() carCollection: CarCollection[] = [];
  @Input() isCardSlider = true;
  @Input() exteriorImages?: string[];
  @Input() interior?: Interior;
  @Output() carSelected = new EventEmitter<Car>();

  @ViewChild(SwiperComponent) swiper?: SwiperComponent;

  currentIndex = 1;
  images?: string[];

  handleCarSelected(selectedCar: Car) {
    this.carSelected.emit(selectedCar);
  }

  navNext() {
    this.swiper?.swiperRef.slideNext();
  }

  navPrev() {
    this.swiper?.swiperRef.slidePrev();
  }

  onSlideChange(params: EventsParams['realIndexChange']) {
    if (!this.isCardSlider) {
      const [swiper] = params;
      this.currentIndex = swiper.realIndex + 1;
    }
  }
}
