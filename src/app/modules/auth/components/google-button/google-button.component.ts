import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss']
})
export class GoogleButtonComponent {
  @Input() label= ''

  constructor(private firebaseAuth: AuthService) {}

  handleOnSubmit(){
    this.firebaseAuth.handleGoogleAuthentication()
  }
}
