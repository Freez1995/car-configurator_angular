import { Component } from '@angular/core';
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

  constructor(private readonly authStoreService: AuthStoreService) {}

  onLoginFormSubmited({ email, password }: UserAuthCredentials) {
    this.authStoreService.handleSignIn({ email, password });
  }

  onGoogleSignedIn() {
    this.authStoreService.handleGoogleAuthentication();
  }
}
