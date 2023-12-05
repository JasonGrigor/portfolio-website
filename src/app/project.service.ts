import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Project } from './project';
import { PROJECTS } from './mock-projects';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  constructor() { }

  getProjects(): Observable<Project[]> {
    const projects = of(PROJECTS);
    //this.messageService.add('ProjectService: fetched projectes');
    return projects;
  }

  getProject(id: number): Observable<Project> {
    const project = PROJECTS.find(h => h.id === id)!;
    //this.messageService.add(`ProjectService: fetched project id=${id}`);
    return of(project);
  }

}
