import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { RegisterComponent } from './modules/auth/views/register/register.component';
import { HomeEmptyStateComponent } from './modules/home/home-empty-state/home-empty-state.component';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';
import {
  redirectUnauthorizedTo,
  canActivate,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'sign-up',
    component: RegisterComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'sign-in',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: '',
    component: LayoutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: 'home',
        component: HomeEmptyStateComponent,
        data: { redirectUnauthorizedToLogin },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
