import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project, ProjectDetails } from '../types';
import { ProjectService } from '../project.service';
import { Observable, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})

export class ProjectDetailsComponent implements OnInit {
  showLeftArrow: boolean = false;
  showRightArrow: boolean = false;
  project: ProjectDetails | undefined;
  loading: boolean = false;
  error: string | undefined;
  private sub: Subscription | undefined;
  selectedImagePath: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) { }

  ngAfterViewInit(): void {
    this.updateScrollArrows();
  }

  ngOnInit(): void {
    this.sub = new Subscription();
    this.getProject();
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const sub = this.projectService.getProjectDetails(id)
                .pipe(
                  catchError((error) => {
                    this.error = 'Error loading project: ' + error.message;
                    throw error;
                  }),
                  finalize(() => {
                    this.loading = false;
                    window.scrollTo(0, 420);
                  })
                )
                .subscribe(project => {
                  this.project = project;
                });
  }

  updateScrollArrows(): void {
    const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
    this.showLeftArrow = scrollContainer.scrollLeft > 0;
    this.showRightArrow = scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth);
  }

  scrollGallery(direction: 'left' | 'right'): void {
    const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
    const scrollAmount = 200; // Adjust this value based on your preference
    const currentScrollLeft = scrollContainer.scrollLeft;

    if (direction === 'left') {
      scrollContainer.scrollTo({
        left: Math.max(currentScrollLeft - scrollAmount, 0),
        behavior: 'smooth',
      });
    } else {
      scrollContainer.scrollTo({
        left: currentScrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }

    this.updateScrollArrows();
  }

  loadFullImage(index: number): void {
    this.selectedImagePath = this.project?.imagePaths[index];
  }

  closeModal(): void {
    this.selectedImagePath = undefined;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
