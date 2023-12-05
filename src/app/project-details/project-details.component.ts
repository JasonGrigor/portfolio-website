import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Observable, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})

export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  loading: boolean = false;
  error: string | undefined;
  private sub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.sub = new Subscription();
    this.getProject();
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const sub = this.projectService.getProject(id)
      .pipe(
        catchError((error) => {
          this.error = 'Error loading project: ' + error.message;
          throw error;
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(project => {
        this.project = project!;
      });
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
