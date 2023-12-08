import { Component } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {
  projects: Project[] = [];
  uniqueTags: string[] = [];
  activeTags: string[] = [];
  filteredProjects: Project[] = [];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
        this.uniqueTags = this.extractUniqueTags();
        Object.assign(this.activeTags, this.uniqueTags);
        this.updateFilteredProjects();
      });
  }

  private extractUniqueTags(): string[] {
    const uniqueTags: string[] = [];

    this.projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if (!uniqueTags.includes(tag)) uniqueTags.push(tag);
      });
    });

    return uniqueTags;
  }

  private updateFilteredProjects(): void {
    this.filteredProjects = this.projects.filter((project) => {
      // Check if the project has at least one active tag
      return project.tags.some((tag) => this.activeTags.includes(tag));
    });
  }

  toggleTag(tag: string): void {
    if (this.activeTags.includes(tag)) {
      // Remove the tag if it's already active
      this.activeTags = this.activeTags.filter((activeTag) => activeTag !== tag);
    } else {
      // Add the tag if it's not active
      this.activeTags.push(tag);
    }

    this.updateFilteredProjects();
  }

}
