import { Component } from '@angular/core';
import {ActivatedRoute, Router, Routes, RouterOutlet} from "@angular/router";
import { AuthorComponent } from './author/author.component';
import { CommonModule } from '@angular/common';

export const authorsRoutes: Routes = [
    {path: ':id', component: AuthorComponent}
  ];

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
    errorMessage: string | null = null;
    
    constructor(private router: Router, private route: ActivatedRoute) {}

    submit(value: string): void {
        if(!value){
            this.errorMessage = "Please enter a valid Author ID.";
        } else {
            this.errorMessage=""
            this.router.navigate([value], { relativeTo: this.route }).then(r => {});
        }
    }  
}