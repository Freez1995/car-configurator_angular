import { Component } from '@angular/core';
import { AuthData, AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private firebaseAuth: AuthService) {}

  handleLoginUser({ email, password }: AuthData) {
    this.firebaseAuth.handleSignIn({ email: email, password: password });
  }
}
