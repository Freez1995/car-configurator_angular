import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEmptyStateComponent } from './components/home-empty-state/home-empty-state.component';

const routes: Routes = [
  {
    path: '',
    component: HomeEmptyStateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
