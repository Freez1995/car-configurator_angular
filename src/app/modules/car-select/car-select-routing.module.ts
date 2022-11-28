import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarSelectorComponent } from './views/car-selector/car-selector.component';

const routes: Routes = [
  {
    path: '',
    component: CarSelectorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarSelectRoutingModule {}
