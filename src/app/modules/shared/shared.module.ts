import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutComponent } from './components/layout/layout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ErrorTransformPipe } from './pipes/error-transform.pipe';

@NgModule({
  declarations: [LayoutComponent, ErrorTransformPipe],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
  ],
  exports: [LayoutComponent, ErrorTransformPipe],
  providers: [],
})
export class SharedModule {}
