import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AuthorsComponent {
  authorId!: number;
  author: any = null;
  errorMessage: string = '';
  private apiUrl = 'http://localhost:8080/books-api/authors';

  constructor(private http: HttpClient) {}


  fetchAuthor(): void {
    this.resetMessages();
    this.getAuthorById(this.authorId).subscribe({
      next: (data) => {
        if (data) {
          this.author = data;
          this.errorMessage = ''; // Clear any previous error
        } else {
          this.handleError('Author not found.');
        }
      },
      error: (err) => this.handleError(`Error fetching author: ${err.message}`),
    });
  }

  getAuthorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        // Handle error
        return of(null);
      })
    );
  }

  resetMessages(): void {
    this.errorMessage = '';
    this.author = null;
  }

  // general error handling
  handleError(message: string): void {
    this.errorMessage = message;
    this.author = null;
  }
}