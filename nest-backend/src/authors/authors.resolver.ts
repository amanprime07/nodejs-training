import {
  Args,
  Context,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author } from './author.model';
import { Post } from '../post/post.model';
import { PostsService } from '../post/post.service';
import { AuthorsService } from './author.service';
import { IDataLoaders } from '../dataloader/dataloader.interface';

@Resolver(Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(() => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @Query(() => [Author], { name: 'authors' })
  async getAuthors(@Args('ids', { type: () => [Int] }) ids: [number]) {
    return this.authorsService.find(ids);
  }

  @ResolveField('posts', () => [Post])
  async posts(
    @Parent() author: Author,
    @Context() { loaders }: { loaders: IDataLoaders },
  ) {
    const { id } = author;
    return loaders.postLoader.load(id);
  }
}
