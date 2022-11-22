import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserAuthCredentials } from '../models/UserAuthCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId = '';

  constructor(public auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      }
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
