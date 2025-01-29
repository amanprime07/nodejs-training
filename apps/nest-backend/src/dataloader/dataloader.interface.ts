import DataLoader from 'dataloader';
import { Post } from '../post/post.model';
import { Author } from '../authors/author.model';

export interface IDataLoaders {
  postLoader: DataLoader<number, Post[]>;
  authorLoader: DataLoader<number, Author[]>;
}
