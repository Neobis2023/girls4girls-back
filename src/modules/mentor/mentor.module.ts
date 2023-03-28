import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentor } from './entities/mentor.entity';
import { MentorsController } from './mentor.controller';
import { MentorService } from './mentor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor])],
  providers: [MentorService],
  controllers:[MentorsController]
})
export class MentorModule {}
