import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { ImageModule } from '../image/image.module';
import { ImageService } from '../image/image.service';
import { Image } from '../image/entities/image.entity';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Forum, Image]),
    ImageModule,
    CloudinaryModule,
  ],
  controllers: [ForumController],
  providers: [ForumService, ImageService],
  exports: [ForumService],
})
export class ForumModule {}
