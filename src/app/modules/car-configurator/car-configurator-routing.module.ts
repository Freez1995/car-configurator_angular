import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarConfigRoutes } from '../shared/enums';
import { CarConfiguratorComponent } from './views/car-configurator/car-configurator.component';
import { CarSelectorComponent } from './views/car-selector/car-selector.component';
import { ConfigurationSummaryComponent } from './views/configuration-summary/configuration-summary.component';
import { ConfigureExteriorComponent } from './views/configure-exterior/configure-exterior.component';
import { ConfigureInteriorComponent } from './views/configure-interior/configure-interior.component';
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
        path: CarConfigRoutes.ConfiguratorViewPage,
        component: DetailsPageComponent,
      },
      {
        path: CarConfigRoutes.ConfiguratorExteriorPage,
        component: ConfigureExteriorComponent,
      },
      {
        path: CarConfigRoutes.ConfiguratorInteriorPage,
        component: ConfigureInteriorComponent,
      },
      {
        path: CarConfigRoutes.ConfiguratorSummaryPage,
        component: ConfigurationSummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarConfiguratorRoutingModule {}
