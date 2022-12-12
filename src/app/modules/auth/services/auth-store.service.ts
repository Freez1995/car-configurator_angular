import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CarStoreService } from '../../car-configurator/services/car-store.service';
import { Store } from '../../shared/classes/store.class';
import { Routes } from '../../shared/enums';
import { ErrorTransformPipe } from '../../shared/pipes/error-transform.pipe';
import { UserAuthCredentials } from '../models/UserAuthCredentials';
import { AuthService } from './auth-service.service';

export interface AuthStore {
  userId: string;
  isSignInLoading: boolean;
  isSignUpLoading: boolean;
  isGoogleAuthenticationLoading: boolean;
}

const initialState: AuthStore = {
  userId: '',
  isSignInLoading: false,
  isSignUpLoading: false,
  isGoogleAuthenticationLoading: false,
};

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService extends Store<AuthStore> {
  userId$ = this.select((state) => state.userId);
  isSignInLoading$ = this.select((state) => state.isSignInLoading);
  isSignUpLoading$ = this.select((state) => state.isSignUpLoading);
  isGoogleAuthenticationLoading$ = this.select(
    (state) => state.isGoogleAuthenticationLoading
  );

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly authService: AuthService,
    private readonly carStoreService: CarStoreService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly errorTransform: ErrorTransformPipe
  ) {
    super(initialState);

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userId: user.uid,
        });
        this.carStoreService.setSelectedConfiguration({ userId: user.uid });
      }
      this.router.navigate([Routes.HomePage]);
    });
  }

  handleSignIn({ email, password }: UserAuthCredentials) {
    this.setState({
      isSignInLoading: true,
    });
    this.authService
      .handleSignIn({ email, password })
      .then(() => {
        this.setState({
          isSignInLoading: false,
        });
        this.router.navigate([Routes.HomePage]);
      })
      .catch((error) => {
        this.setState({
          isSignInLoading: false,
        });
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
      });
  }

  handleSignUp({ email, password }: UserAuthCredentials) {
    this.setState({
      isSignUpLoading: true,
    });
    this.authService
      .handleSignUp({ email, password })
      .then(() => {
        this.setState({
          isSignUpLoading: false,
        });
        this.router.navigate([Routes.HomePage]);
      })
      .catch((error) => {
        this.setState({
          isSignUpLoading: false,
        });
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
      });
  }

  handleGoogleAuthentication() {
    this.setState({
      isGoogleAuthenticationLoading: true,
    });
    this.authService
      .handleGoogleAuthentication()
      .then(() => {
        this.setState({
          isGoogleAuthenticationLoading: false,
        });
        this.router.navigate([Routes.HomePage]);
      })
      .catch((error) => {
        this.setState({
          isGoogleAuthenticationLoading: false,
        });
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
      });
  }

  handgleSignOut() {
    this.authService
      .handleSignOut()
      .then(() => {
        this.router.navigate([Routes.SignInPage]);
      })
      .catch((error) => {
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
      });
  }
}
