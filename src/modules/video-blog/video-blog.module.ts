import { Module } from '@nestjs/common';
import { VideoBlogService } from './video-blog.service';
import { VideoBlogController } from './video-blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoBlog } from './entities/video-blog.entity';
import { Categories } from '../categories/entities/category.entity';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';
import { ImageModule } from '../image/image.module';
import { Image } from '../image/entities/image.entity';
import { UserModule } from '../user/user.module';
import { JetonModule } from '../jeton/jeton.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoBlog, Categories, Image]),
    CloudinaryModule,
    ImageModule,
    UserModule,
    JetonModule,
  ],
  providers: [VideoBlogService],
  controllers: [VideoBlogController],
  exports: [VideoBlogService],
})
export class VideoBlogModule {}
