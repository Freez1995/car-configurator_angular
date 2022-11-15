import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/views/login/login.component';
import { RegisterComponent } from './modules/auth/views/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'sign-in', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
