import { Module } from '@nestjs/common';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './author.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [AuthorsService, AuthorsResolver],
  exports: [AuthorsResolver],
})
export class AuthorsModule {}
