import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from '../training/entities/training.entity';
import { User } from '../user/entities/user.entity';
import { Mentee } from './entities/mentee.entity';
import { MenteeController } from './mentee.controller';
import { MenteeService } from './mentee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mentee])],
  providers: [MenteeService],
  controllers: [MenteeController]
})
export class MenteeModule {}
