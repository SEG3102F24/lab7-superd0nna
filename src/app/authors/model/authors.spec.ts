import { Author } from './authors'

describe('Author', () => {
  it('should create an instance', () => {
    expect(new Author(1, 'test', 'test')).toBeTruthy();
  });
});