import { Component } from '@angular/core';
import { AuthnData, AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  constructor(private firebaseAuth: AuthService) { }

  handleRegisterUser({email, password}: AuthnData){
    this.firebaseAuth.handleSignUp({email, password})
  }

}
