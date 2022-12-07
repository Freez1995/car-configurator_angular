import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color, SavedCarConfiguration } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'shown',
        style({
          transform: 'translate3d(0,0,0)',
        })
      ),
      state(
        'hidden',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('shown => hidden', animate('400ms ease-in-out')),
      transition('hidden => shown', animate('400ms ease-in-out')),
    ]),
  ],
})
export class ColorPickerComponent implements OnInit {
  @Input() carColors?: Color[];
  @Input() selectedConfiguration?: SavedCarConfiguration;
  @Output() onSelectColor = new EventEmitter<Color>();
  colorPickerShown: 'shown' | 'hidden' = 'hidden';
  colorOnPickerOpen?: Color;

  ngOnInit(): void {
    this.colorOnPickerOpen = { ...this.selectedConfiguration?.color! };
  }

  handleSelectColor(color: Color) {
    this.onSelectColor.emit(color);
  }

  close(isSaveNeeded: boolean) {
    if (isSaveNeeded) {
      this.colorOnPickerOpen = { ...this.selectedConfiguration?.color! };
      this.onSelectColor.emit(this.colorOnPickerOpen);
      this.colorPickerShown = 'hidden';
      return;
    }
    this.onSelectColor.emit(this.colorOnPickerOpen);
    this.colorPickerShown = 'hidden';
  }
}
