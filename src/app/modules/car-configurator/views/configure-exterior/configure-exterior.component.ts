import { Component, ViewChild } from '@angular/core';
import { Color } from 'src/app/modules/shared/models';
import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';
import { WheelsPickerComponent } from '../../components/wheels-picker/wheels-picker.component';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-configure-exterior',
  templateUrl: './configure-exterior.component.html',
  styleUrls: ['./configure-exterior.component.scss'],
})
export class ConfigureExteriorComponent {
  @ViewChild('wheelsPickerComponent', { static: false })
  wheelsPickerComponent?: WheelsPickerComponent;
  @ViewChild('colorPickerComponent', { static: false })
  colorPickerComponent?: ColorPickerComponent;

  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  colors$ = this.carStoreService.colors$;
  wheels$ = this.carStoreService.wheels$;
  exteriors$ = this.carStoreService.exteriors$;

  constructor(private readonly carStoreService: CarStoreService) {}

  handleToggleWheelsPicker() {
    if (this.wheelsPickerComponent) {
      this.wheelsPickerComponent.handleToggleWheelsPicker();
    }
  }

  handleToggleColorPicker() {
    if (this.colorPickerComponent) {
      this.colorPickerComponent.handleToggleColorPicker();
    }
  }

  handleSelectColor(color: Color) {
    this.carStoreService.setSelectedConfiguration({ color });
  }
}
