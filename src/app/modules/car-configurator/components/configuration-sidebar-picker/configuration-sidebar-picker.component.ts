import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Color,
  Interior,
  SavedCarConfiguration,
  Wheels,
} from 'src/app/modules/shared/models';

@Component({
  selector: 'app-configuration-sidebar-picker',
  templateUrl: './configuration-sidebar-picker.component.html',
  styleUrls: ['./configuration-sidebar-picker.component.scss'],
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
export class ConfigurationSidebarPicker implements OnInit {
  @Input() carColors?: Color[];
  @Input() carWheels?: Wheels[];
  @Input() carInteriors?: Interior[];
  @Input() selectedConfiguration?: SavedCarConfiguration;
  @Output() configurationChanged = new EventEmitter<SavedCarConfiguration>();
  sidebarPickerShown: 'shown' | 'hidden' = 'hidden';
  configurationPickerType?: 'color' | 'wheels' | 'interior';
  configurationOnPickerOpen?: SavedCarConfiguration;

  ngOnInit(): void {
    this.configurationOnPickerOpen = { ...this.selectedConfiguration! };
  }

  handleConfigurationChanged(property: Color | Wheels | Interior) {
    this.configurationChanged.emit({
      ...this.configurationOnPickerOpen!,
      [this.configurationPickerType!]: property,
    });
  }

  close(isSaveNeeded: boolean) {
    if (isSaveNeeded) {
      this.configurationOnPickerOpen = { ...this.selectedConfiguration! };
      this.configurationChanged.emit(this.configurationOnPickerOpen);
      this.sidebarPickerShown = 'hidden';
      return;
    }
    this.configurationChanged.emit(this.configurationOnPickerOpen);
    this.sidebarPickerShown = 'hidden';
  }
}
