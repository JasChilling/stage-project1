import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  showNavbar = true;

  constructor(private router: Router) {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {

        this.showNavbar =
          event.urlAfterRedirects !== '/login' &&
          event.urlAfterRedirects !== '/register';

      });

  }

}