import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { SavedCarConfiguration, Wheels } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-wheels-picker',
  templateUrl: './wheels-picker.component.html',
  styleUrls: ['./wheels-picker.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0,0,0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class WheelsPickerComponent {
  @Input() carWheels?: Wheels[];
  @Input() selectedConfiguration?: SavedCarConfiguration;
  wheelsPickerShown: string = 'out';

  handleToggleWheelsPicker() {
    this.wheelsPickerShown = this.wheelsPickerShown === 'out' ? 'in' : 'out';
  }
}
