import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
