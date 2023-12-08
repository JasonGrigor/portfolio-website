import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LoadingService } from './loading.service';
import { Project, ProjectDetails } from './types';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {

  constructor(private loadingService: LoadingService) { }

  createDb() {
    const projects: Project[] = [
      {
        id: 1,
        name: 'Cavo d\'Oro',
        description: 'Album artwork and layout for greek hip-hop duo \'Enorkoi\'.',
        tags: ['commission', 'album', 'illustration']
      },
      {
        id: 2,
        name: 'Can\'-Ka No Rey',
        description: 'Tribute illustration for Stephen King\'s famous book series \'The Dark Tower\'',
        tags: ['personal work', 'illustration']
      },
      {
        id: 3,
        name: 'Sybetha',
        description: 'Logo for my rock band',
        tags: ['personal work', 'logo']
      },
      {
        id: 4,
        name: 'Γόος',
        description: 'Poster for short film \'Γόος\' screened at Drama International Short Film Festival',
        tags: ['commission', 'poster']
      },
      {
        id: 5,
        name: 'Several Circles',
        description: 'Poster for theater play \'Several Circles\'.',
        tags: ['commission', 'poster']
      },
      {
        id: 6,
        name: 'Carcosa',
        description: 'Logo for a clothing brand.',
        tags: ['commission', 'logo']
      },
      {
        id: 7,
        name: 'Lady of Sorrows',
        description: '',
        tags: ['personal work', 'illustration']
      },
      {
        id: 8,
        name: 'Nasussalar',
        description: 'YouTube illustration for a song by Enorkoi.',
        tags: ['commission', 'illustration']
      },
      {
        id: 9,
        name: 'NADA',
        description: 'Logo for a culture webzine.',
        tags: ['commission', 'logo']
      },
      {
        id: 10,
        name: 'Hermit Skull',
        description: '',
        tags: ['personal work', 'illustration']
      }
    ];

    projects.forEach(project => {
      project.thumbnailPath = `/assets/images/projects/_thumbnails/${project.name}_thumb.png`;
    });

    const projectDetails: ProjectDetails[] = [
      {
        id: 1,
        name: 'Cavo d\'Oro',
        description: 'Enorkoi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        numberOfImages: 7,
        links: [
          'https://www.facebook.com/enorkoi',
          'https://www.instagram.com/enorkoi/',
          'https://www.youtube.com/@enorkoi'
        ],        
        tags: ['commission', 'album', 'illustration'],
        imagePaths: [],
        thumbnailPaths: []
      },
      {
        id: 2,
        name: 'Can\'-Ka No Rey',
        description: 'Can\' - Ka No Rey Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        numberOfImages: 1,
        links: [
          'https://www.instagram.com/p/CjaxDfHqNWq/?img_index=1'
        ],
        tags: ['personal work', 'poster', 'illustration'],
        imagePaths: [],
        thumbnailPaths: []
      }
    ]

    projectDetails.forEach(project => {
      for (let i = 1; i <= project.numberOfImages; i++) {
        project.imagePaths.push(`/assets/images/projects/_details/${project.name}/${i}.png`)
        project.thumbnailPaths.push(`/assets/images/projects/_details/${project.name}/${i}_thumb.png`)
      }
    })
    this.loadingService.setProjectsLoaded();

    return { projects, projectDetails };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the projects array is empty,
  // the method below returns the initial number (11).
  // if the projects array is not empty, the method below returns the highest
  // project id + 1.

  genId(projects: Project[]): number {
    if (projects.length <= 0) return 0;
    return Math.max(...projects.map(project => project.id)) + 1;
  }
}
