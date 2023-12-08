import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private projectsLoadedSubject = new BehaviorSubject<boolean>(false);
  projectsLoaded$ = this.projectsLoadedSubject.asObservable();

  setProjectsLoaded() {
    this.projectsLoadedSubject.next(true);
  }
}
