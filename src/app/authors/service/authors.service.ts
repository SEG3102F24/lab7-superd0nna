import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../model/authors';

const Url = 'http://localhost:8080/books-api/';

@Injectable({
    providedIn: 'root'
})
export class AuthorsService {
    private http: HttpClient = inject(HttpClient);

    public getAuthorById(id: string): Observable<Author> {
        return this.http.get<Author>(`${Url}authors/${id}`);
    }    
}