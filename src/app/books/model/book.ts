import { Author } from "../../authors/model/authors";

export class Book {
  constructor(
    public id: number,
    public category: string,
    public title: string,
    public cost: number,
    public authors?: Author[],
    public year?: number,
    public description?: string
  ) {}
}
