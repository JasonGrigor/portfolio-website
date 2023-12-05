import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router) { }

  public navLinks = [
    { path: '/home', label: 'Home', sectionId: 'home' },
    { path: '/projects', label: 'Projects', sectionId: 'projects' },
    { path: '/contact', label: 'Contact', sectionId: 'contact' }
  ];

  public navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

}
