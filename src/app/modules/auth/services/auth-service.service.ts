import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { CarStoreService } from '../../car-configurator/services/car-store.service';
import { UserAuthCredentials } from '../models/UserAuthCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId = '';

  constructor(
    public auth: AngularFireAuth,
    private carStoreService: CarStoreService,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.carStoreService.setSelectedConfiguration({ userId: user.uid });
      }
      this.router.navigate(['/']);
    });
  }

  handleSignUp({ email, password }: UserAuthCredentials) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  handleSignIn({ email, password }: UserAuthCredentials) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  handleGoogleAuthentication() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  handleSignOut() {
    return this.auth.signOut();
  }
}
