import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  public isStuck: boolean = false;
  showSpinner = false;

  projectsLoaded = false;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.loadingService.projectsLoaded$.subscribe((loaded) => {
      this.projectsLoaded = loaded;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollThreshold = 400;

    if (scrollPosition >= scrollThreshold) {
      this.renderer.addClass(document.body, 'navbar-stuck');
      this.isStuck = true;
    } else {
      this.renderer.removeClass(document.body, 'navbar-stuck');
      this.isStuck = false;
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
