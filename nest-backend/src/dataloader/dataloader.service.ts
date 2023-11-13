import { PostsService } from '../post/post.service';
import { IDataLoaders } from './dataloader.interface';
import { Post } from '../post/post.model';
import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataloaderService {
  constructor(private readonly postService: PostsService) {}

  getLoaders(): IDataLoaders {
    const postLoader = this._createPostLoader();
    return {
      postLoader,
    };
  }

  private _createPostLoader() {
    return new DataLoader<number, Post[]>(async (keys: readonly number[]) =>
      this.postService.findAllByAuthorIds(keys as [number]),
    );
  }
}
