import { Component } from '@angular/core';
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

  constructor(private readonly authStoreService: AuthStoreService) {}

  onRegisterFormSubmited({ email, password }: UserAuthCredentials) {
    this.authStoreService.handleSignUp({ email, password });
  }

  onGoogleSignedUp() {
    this.authStoreService.handleGoogleAuthentication();
  }
}
