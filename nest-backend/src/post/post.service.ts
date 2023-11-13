import { Post } from './post.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { authorId: 1, id: 1, title: 'Lorem Ipsum' },
    { authorId: 1, id: 2, title: 'Foo' },
    { authorId: 2, id: 3, title: 'Bar' },
    { authorId: 2, id: 4, title: 'Hello World' },
  ];

  findAllByAuthorId(authorId: number): Post[] {
    return this.posts.filter((post) => post.authorId === authorId);
  }

  findAllByAuthorIds(authorIds: [number]): Promise<Post[][]> {
    return this._mapResultToIds(authorIds, this.posts);
  }

  private _mapResultToIds(authorIds: readonly number[], posts: Post[]) {
    return Promise.resolve(
      authorIds.map(
        (id) => posts.filter((post) => post.authorId === id) || null,
      ),
    );
  }

  findOne(postId: number): Post {
    return this.posts.find((post) => post.id === postId);
  }

  findAll(): Post[] {
    return this.posts;
  }
}
