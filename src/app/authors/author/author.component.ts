import { Component, OnDestroy, inject, OnInit } from '@angular/core';
import { Author } from '../model/authors';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorsService } from '../service/authors.service';
import { CommonModule, NgIf } from '@angular/common';
import { AuthornamesPipe } from 'src/app/pipes/authornames.pipe';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, AuthornamesPipe, NgIf],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})

export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorsService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          const id = params['id'];
          this.subscription = this.authorsService.getAuthorById(id).subscribe({
              next: (data: Author) => {
                  this.selectedAuthor = data;
              },
              error: (_: any) => {
                  this.selectedAuthor = null;
              }
          });
      });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}