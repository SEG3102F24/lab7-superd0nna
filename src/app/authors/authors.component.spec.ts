import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorsComponent } from './authors.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, AuthorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display author data when a valid ID is entered', () => {
    // Set the author ID to test with
    component.authorId = 1;

    // Trigger the form submission
    component.fetchAuthor();

    // Expect a GET request to the correct URL
    const req = httpMock.expectOne('http://localhost:8080/books-api/authors/1');
    expect(req.request.method).toBe('GET');

    // Respond with mock author data
    const mockAuthor = { firstName: 'John', lastName: 'Doe' };
    req.flush(mockAuthor);

    // Verify that the author data was fetched and displayed
    fixture.detectChanges(); // Update the view
    const firstNameElement = fixture.debugElement.query(By.css('.author-info p')).nativeElement;
    expect(firstNameElement.textContent).toContain('John');
    expect(component.errorMessage).toBe('');
  });

  it('should display an error message if the author is not found', () => {
    // Set the author ID to test with
    component.authorId = 999;

    // Trigger the form submission
    component.fetchAuthor();

    // Expect a GET request to the correct URL
    const req = httpMock.expectOne('http://localhost:8080/books-api/authors/999');
    expect(req.request.method).toBe('GET');

    // Respond with a 404 error (author not found)
    req.flush({}, { status: 404, statusText: 'Not Found' });

    // Verify that the error message was displayed
    fixture.detectChanges(); // Update the view
    const errorMessageElement = fixture.debugElement.query(By.css('.error-message p')).nativeElement;
    expect(errorMessageElement.textContent).toContain('Author not found.');
    expect(component.author).toBeNull();
  });

  it('should enable the submit button when the form is valid', () => {
    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;

    // Set a valid author ID
    component.authorId = 1;
    fixture.detectChanges(); // Update the view

    expect(submitButton.disabled).toBeFalse();
  });
});