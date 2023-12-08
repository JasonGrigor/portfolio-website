import { Component } from '@angular/core';
import { fadeAnimation } from './fade.animation';
import { RouterOutlet } from '@angular/router';
import { RouteData } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation]
})

export class AppComponent {
  title = 'portfolio-website';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && (outlet.activatedRouteData as RouteData).animation;
  }
}
