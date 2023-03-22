import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/like.entity';
import { User } from '../user/entities/user.entity';
import { VideoBlog } from '../video-blog/entities/video-blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes, User, VideoBlog])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
