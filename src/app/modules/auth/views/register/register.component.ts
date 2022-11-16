import { Component } from '@angular/core';
import { AuthData, AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private firebaseAuth: AuthService) {}

  public isLoading = false;

  handleRegisterUser({ email, password }: AuthData) {
    this.isLoading = true;
    this.firebaseAuth
      .handleSignUp({ email, password })
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => console.log(error));
  }
}
