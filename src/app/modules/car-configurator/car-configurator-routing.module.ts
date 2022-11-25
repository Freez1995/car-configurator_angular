import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorHeaderComponent } from './components/configurator-header/configurator-header.component';
import { DetailsPageComponent } from './views/details-page/details-page.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguratorHeaderComponent,
    children: [
      {
        path: '',
        component: DetailsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarConfiguratorRoutingModule {}
