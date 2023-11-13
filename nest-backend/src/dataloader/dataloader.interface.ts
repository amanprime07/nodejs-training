import DataLoader from 'dataloader';
import { Post } from '../post/post.model';

export interface IDataLoaders {
  postLoader: DataLoader<number, Post[]>;
}
