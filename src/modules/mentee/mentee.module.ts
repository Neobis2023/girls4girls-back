import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentee } from './entities/mentee.entity';
import { MenteeService } from './mentee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mentee])],
  providers: [MenteeService],
})
export class MenteeModule {}
