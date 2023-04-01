import { Module } from '@nestjs/common';
import { TrainingsService } from './training.service';
import { TrainingsController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { Image } from '../image/entities/image.entity';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Training, Image]),
    CloudinaryModule,
    ImageModule,
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService],
  exports: [TrainingsService],
})
export class TrainingsModule {}
