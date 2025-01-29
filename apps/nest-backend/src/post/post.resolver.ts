import {
  Args,
  Context,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './post.model';
import { PostsService } from './post.service';
import { Author } from '../authors/author.model';
import { IDataLoaders } from '../dataloader/dataloader.interface';

@Resolver(Post)
export class PostResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => Post, { name: 'post' })
  async getPost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post], { name: 'posts' })
  async getPosts(@Args('ids', { type: () => [Int] }) ids: [number]) {
    return this.postsService.findAllByIds(ids);
  }

  @ResolveField('author', () => [Author])
  async author(
    @Parent() post: Post,
    @Context() { loaders }: { loaders: IDataLoaders },
  ) {
    const { authorId } = post;
    return loaders.authorLoader.load(authorId);
  }
}
