import { Module } from '@nestjs/common';
import { VideoBlogService } from './video-blog.service';
import { VideoBlogController } from './video-blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoBlog } from './entities/video-blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoBlog])],
  providers: [VideoBlogService],
  controllers: [VideoBlogController],
})
export class VideoBlogModule {}
