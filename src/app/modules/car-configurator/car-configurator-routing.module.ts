import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorHeaderComponent } from './components/configurator-header/configurator-header.component';
import { CarConfiguratorComponent } from './views/car-configurator/car-configurator.component';
import { CarSelectorComponent } from './views/car-selector/car-selector.component';
import { ConfigureExteriorComponent } from './views/configure-exterior/configure-exterior.component';
import { DetailsPageComponent } from './views/details-page/details-page.component';

const routes: Routes = [
  {
    path: '',
    component: CarConfiguratorComponent,
    children: [
      {
        path: '',
        component: CarSelectorComponent,
      },
      {
        path: 'view',
        component: DetailsPageComponent,
      },
      {
        path: 'configure-exterior',
        component: ConfigureExteriorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarConfiguratorRoutingModule {}
