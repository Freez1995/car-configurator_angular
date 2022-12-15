import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { UserAuthCredentials } from '../../models/UserAuthCredentials';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isSignInLoading$ = this.authStoreService.isSignInLoading$;
  isGoogleAuthenticationLoading$ =
    this.authStoreService.isGoogleAuthenticationLoading$;

  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly router: Router
  ) {}

  onLoginFormSubmited({ email, password }: UserAuthCredentials) {
    this.authStoreService.handleSignIn({ email, password }).subscribe(() => {
      this.router.navigate([CarConfigRoutes.HomePage]);
    });
  }

  onGoogleSignIn() {
    this.authStoreService.handleGoogleAuthentication().subscribe(() => {
      this.router.navigate([CarConfigRoutes.HomePage]);
    });
  }
}
