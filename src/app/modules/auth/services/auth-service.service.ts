import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

export interface AuthData {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth) {}

  handleSignUp({ email, password }: AuthData) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  handleSignIn({ email, password }: AuthData) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  handleGoogleAuthentication() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  handleSignOut() {
    return this.auth.signOut();
  }
}
