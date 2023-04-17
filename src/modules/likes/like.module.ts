import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/like.entity';
import { User } from '../user/entities/user.entity';
import { VideoBlog } from '../video-blog/entities/video-blog.entity';
import { UserModule } from '../user/user.module';
import { VideoBlogModule } from '../video-blog/video-blog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Likes, User, VideoBlog]),
    UserModule,
    VideoBlogModule,
  ],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
