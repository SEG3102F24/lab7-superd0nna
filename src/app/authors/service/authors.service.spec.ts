import { TestBed } from '@angular/core/testing';
import { AuthorsService } from './authors.service';
import {RouterTestingModule} from "@angular/router/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('AuthorsService', () => {
    let service: AuthorsService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthorsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
  });
      service = TestBed.inject(AuthorsService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
  