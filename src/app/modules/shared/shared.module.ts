import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CustomSpinnerDirective } from './directives/custom-spinner.directive';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LayoutComponent, CustomSpinnerDirective, SnackBarComponent],
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  exports: [LayoutComponent, CustomSpinnerDirective, SnackBarComponent],
})
export class SharedModule {}
