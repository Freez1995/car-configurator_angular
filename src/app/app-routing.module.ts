import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  canActivate,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';
import { CarConfigRoutes } from './modules/shared/enums';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: CarConfigRoutes.SignInPage, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: '',
    component: LayoutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: CarConfigRoutes.HomePage,
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: CarConfigRoutes.ConfiguratorCarSelectPage,
        loadChildren: () =>
          import('./modules/car-configurator/car-configurator.module').then(
            (m) => m.CarConfiguratorModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
