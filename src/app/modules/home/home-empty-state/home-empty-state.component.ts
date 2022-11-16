import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service.service';

@Component({
  selector: 'app-home-empty-state',
  templateUrl: './home-empty-state.component.html',
  styleUrls: ['./home-empty-state.component.scss'],
})
export class HomeEmptyStateComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onLogout() {
    this.auth.handleSignOut();
  }
}
