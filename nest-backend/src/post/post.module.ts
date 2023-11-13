import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  providers: [PostsService, PostResolver],
  exports: [PostsService, PostResolver],
})
export class PostModule {}
