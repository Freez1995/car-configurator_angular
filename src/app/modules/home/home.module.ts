import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { HomeEmptyStateComponent } from './components/home-empty-state/home-empty-state.component';
import { HomeRoutingModule } from './home-routing.module';
import { ErrorTransformPipe } from '../shared/pipes/error-transform.pipe';
import { HomeSavedConfigurationsComponent } from './components/home-saved-configurations/home-saved-configurations.component';
import { HomeComponent } from './views/home/home.component';
import { DateTransformPipe } from './pipes/date-transform.pipe';

@NgModule({
  declarations: [
    HomeEmptyStateComponent,
    HomeSavedConfigurationsComponent,
    HomeComponent,
    DateTransformPipe,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    HomeRoutingModule,
  ],
  exports: [],
  providers: [ErrorTransformPipe, DateTransformPipe],
})
export class HomeModule {}
