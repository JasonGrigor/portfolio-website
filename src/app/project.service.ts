import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Project, ProjectDetails } from './types';
import { PROJECTS } from './mock-projects';

@Injectable({ providedIn: 'root' })

export class ProjectService {
  private projectsUrl = 'api/projects';  // URL to web 
  private projectDetailsUrl = 'api/projectDetails';  // URL to web api
  
  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    //const projects = of(PROJECTS);
    //return projects;

    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  getProjectDetails(id: number): Observable<ProjectDetails> {
    //const project = PROJECTS.find(h => h.id === id)!;
    //return of(project);

    const url = `${this.projectDetailsUrl}/${id}`;
    return this.http.get<ProjectDetails>(url)
      .pipe(
        catchError(this.handleError<ProjectDetails>('getProjects'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
