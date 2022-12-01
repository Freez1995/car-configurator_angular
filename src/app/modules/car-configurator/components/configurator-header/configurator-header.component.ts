import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SavedCarConfiguration } from 'src/app/modules/shared/models';

@Component({
  selector: 'app-configurator-header',
  templateUrl: './configurator-header.component.html',
  styleUrls: ['./configurator-header.component.scss'],
})
export class ConfiguratorHeaderComponent {
  @Input() selectedConfiguration?: SavedCarConfiguration;

  constructor(private router: Router) {}

  handleNavigateBack() {
    this.router.navigate(['/configurator']);
  }

  handleNavigateConfiguration() {}

  handleDelete() {
    this.router.navigate(['/home']);
  }
}
