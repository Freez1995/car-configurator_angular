import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // constructor(private router: Router) {
  //   this.router.events
  //     .pipe(filter((val) => val instanceof NavigationEnd))
  //     .subscribe((val) => console.log('Val: ', val));
  // }
}
