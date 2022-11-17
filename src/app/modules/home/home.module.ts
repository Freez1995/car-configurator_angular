import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeEmptyStateComponent } from './components/home-empty-state/home-empty-state.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeEmptyStateComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    HomeRoutingModule,
  ],
  exports: [],
})
export class HomeModule {}
