import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl } from '@angular/forms';
import firebase from 'firebase/compat/app';

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

  handleSignUp(email: AbstractControl, password: AbstractControl){
    this.auth.createUserWithEmailAndPassword(email.value, password.value)
  }

  handleGoogleAuthentication(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
  }

  handleSignOut(){
    this.auth.signOut()
  }

}
