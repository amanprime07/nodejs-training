import { Injectable } from '@nestjs/common';
import { Author } from './author.model';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    { id: 1, firstName: 'test', lastName: 'testlastname' },
    { id: 2, firstName: 'test2', lastName: 'test2lastname' },
  ];

  findOneById(authorId: number) {
    return this.authors.find((author) => author.id === authorId);
  }

  find(authorIds: [number]) {
    return this.authors.filter((author) => authorIds.includes(author.id));
  }
}
