import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { PostModule } from '../post/post.module';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [PostModule, AuthorsModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
