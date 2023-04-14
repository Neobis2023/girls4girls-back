import { Module } from '@nestjs/common';
import { LecturerService } from './lecturers.service';
import { LecturerController } from './lecturers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturer } from './entities/lecturer.entity';
import { Image } from '../image/entities/image.entity';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecturer, Image]),
    ImageModule,
    CloudinaryModule,
  ],
  controllers: [LecturerController],
  providers: [LecturerService],
})
export class LecturerModule {}
