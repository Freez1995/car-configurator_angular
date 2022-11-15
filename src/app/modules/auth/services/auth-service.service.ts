import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

export interface AuthnData {
  email: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Logged in as: ', user)
      } else {
        console.log('Please login')
      }
    });
  }

  handleSignUp({email, password}: AuthnData){
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  handleSignIn({email, password}: AuthnData){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  handleGoogleAuthentication(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
  }

  handleSignOut(){
    this.auth.signOut()
  }

}
