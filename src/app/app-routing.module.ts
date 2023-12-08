import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent, data: { animation: 'HomePage' }  },
  { path: 'project/:id', component: ProjectDetailsComponent, data: { animation: 'ProjectDetailsPage' }   },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
