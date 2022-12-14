import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarConfigRoutes } from '../shared/enums';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path: CarConfigRoutes.SignInPage,
    component: LoginComponent,
  },
  {
    path: CarConfigRoutes.SignUpPage,
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
