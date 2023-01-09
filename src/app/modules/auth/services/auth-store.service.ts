import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, from, tap, throwError } from 'rxjs';
import { CarStoreService } from '../../car-configurator/services/car-store.service';
import { Store } from '../../shared/classes/store.class';
import { CarConfigRoutes } from '../../shared/enums';
import { ErrorTransformPipe } from '../../shared/pipes/error-transform.pipe';
import { UserAuthCredentials } from '../models/UserAuthCredentials';
import { AuthService } from './auth-service.service';

export interface AuthStore {
  userId: string;
  isSignInLoading: boolean;
  isSignUpLoading: boolean;
  isGoogleAuthenticationLoading: boolean;
  isSignOutLoading: boolean;
}

const initialState: AuthStore = {
  userId: '',
  isSignInLoading: false,
  isSignUpLoading: false,
  isGoogleAuthenticationLoading: false,
  isSignOutLoading: false,
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
  isSignOutLoading$ = this.select((state) => state.isSignOutLoading);

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
      this.router.navigate([CarConfigRoutes.HomePage]);
    });
  }

  handleSignIn({ email, password }: UserAuthCredentials) {
    this.setState({
      isSignInLoading: true,
    });
    return from(this.authService.handleSignIn({ email, password })).pipe(
      tap(() => {
        this.setState({
          isSignInLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isSignInLoading: false,
        });
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
        return throwError(
          () => new Error(this.errorTransform.transform(error))
        );
      })
    );
  }

  handleSignUp({ email, password }: UserAuthCredentials) {
    this.setState({
      isSignUpLoading: true,
    });
    return from(this.authService.handleSignUp({ email, password })).pipe(
      tap(() => {
        this.setState({
          isSignUpLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isSignUpLoading: false,
        });
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
        return throwError(
          () => new Error(this.errorTransform.transform(error))
        );
      })
    );
  }

  handleGoogleAuthentication() {
    this.setState({
      isGoogleAuthenticationLoading: true,
    });
    return from(this.authService.handleGoogleAuthentication()).pipe(
      tap((user) => {
        this.setState({
          isGoogleAuthenticationLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isGoogleAuthenticationLoading: false,
        });
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
        return throwError(
          () => new Error(this.errorTransform.transform(error))
        );
      })
    );
  }

  handleSignOut() {
    this.setState({
      isSignOutLoading: true,
    });
    return from(this.authService.handleSignOut()).pipe(
      tap(() => {
        this.setState({
          isSignOutLoading: false,
        });
      }),
      catchError((error) => {
        this.setState({
          isSignOutLoading: false,
        });
        this.snackBar.open(this.errorTransform.transform(error), 'Cancel', {
          duration: 5000,
        });
        return throwError(
          () => new Error(this.errorTransform.transform(error))
        );
      })
    );
  }
}
