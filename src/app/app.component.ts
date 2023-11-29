import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//import { StringLiteralsService } from './string-literals.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'portfolio-website';

  //constructor(public stringLiterals: StringLiteralsService) { }

  //ngOnInit(): void {
  //  // Set language (e.g., 'en' for English, 'es' for Spanish)
  //  const language = 'en';
  //  this.stringLiterals.loadStrings(language).subscribe();
  //}

}
