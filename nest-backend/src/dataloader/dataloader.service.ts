import { PostsService } from '../post/post.service';
import { IDataLoaders } from './dataloader.interface';
import { Post } from '../post/post.model';
import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { Author } from '../authors/author.model';
import { AuthorsService } from '../authors/author.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly postService: PostsService,
    private readonly authorService: AuthorsService,
  ) {}

  getLoaders(): IDataLoaders {
    const postLoader = this._createPostLoader();
    const authorLoader = this._createAuthorLoader();
    return {
      postLoader,
      authorLoader,
    };
  }

  private _createPostLoader() {
    return new DataLoader<number, Post[]>(async (keys: readonly number[]) =>
      this.postService.findAllByAuthorIds(keys as [number]),
    );
  }

  private _createAuthorLoader() {
    return new DataLoader<number, Author[]>(async (keys: readonly number[]) =>
      this.authorService.find(keys as [number]),
    );
  }
}
