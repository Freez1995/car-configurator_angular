import { Component, Inject, inject, Input } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);

  @Input() message = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
