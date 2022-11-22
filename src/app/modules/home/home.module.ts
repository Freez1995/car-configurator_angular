import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeEmptyStateComponent } from './components/home-empty-state/home-empty-state.component';
import { HomeRoutingModule } from './home-routing.module';
import { ErrorTransformPipe } from '../shared/pipes/error-transform.pipe';
import { HomeSavedConfigurationsComponent } from './components/home-saved-configurations/home-saved-configurations.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    HomeEmptyStateComponent,
    HomeSavedConfigurationsComponent,
    HomeComponent,
  ],
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
  providers: [ErrorTransformPipe],
})
export class HomeModule {}
