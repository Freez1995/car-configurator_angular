import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Color, SavedCarConfiguration } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
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
export class ColorPickerComponent implements OnChanges {
  @Input() carColors?: Color[];
  @Input() selectedConfiguration?: SavedCarConfiguration;
  @Output() onSelectColor = new EventEmitter<Color>();
  colorPickerShown: string = 'out';
  currentColor?: Color;
  previousColor?: Color;

  handleToggleColorPicker() {
    this.colorPickerShown = this.colorPickerShown === 'out' ? 'in' : 'out';
    if (this.previousColor) {
      this.onSelectColor.emit(this.previousColor);
    }
  }

  handleSelectColor(color: Color) {
    this.onSelectColor.emit(color);
    this.currentColor = color;
  }

  handleSaveColor() {
    this.onSelectColor.emit(this.currentColor);
    this.colorPickerShown = 'out';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.colorPickerShown == 'out') {
      this.previousColor = this.selectedConfiguration?.color;
    }
  }
}
