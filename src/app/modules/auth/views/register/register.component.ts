import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarConfigRoutes } from 'src/app/modules/shared/enums';
import { UserAuthCredentials } from '../../models/UserAuthCredentials';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isSignUpLoading$ = this.authStoreService.isSignUpLoading$;
  isGoogleAuthenticationLoading$ =
    this.authStoreService.isGoogleAuthenticationLoading$;

  constructor(
    private readonly authStoreService: AuthStoreService,
    private readonly router: Router
  ) {}

  onRegisterFormSubmited({ email, password }: UserAuthCredentials) {
    this.authStoreService.handleSignUp({ email, password }).subscribe(() => {
      this.router.navigate([CarConfigRoutes.HomePage]);
    });
  }

  onGoogleSignUp() {
    this.authStoreService.handleGoogleAuthentication().subscribe(() => {
      this.router.navigate([CarConfigRoutes.HomePage]);
    });
  }
}
