import { Module } from '@nestjs/common';
import { TrainingsService } from './training.service';
import { TrainingsController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { Image } from '../image/entities/image.entity';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';
import { ImageModule } from '../image/image.module';
import { UserToTraining } from './entities/users-to-training.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Training, Image, UserToTraining]),
    CloudinaryModule,
    ImageModule,
    UserModule,
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService],
  exports: [TrainingsService],
})
export class TrainingsModule {}
