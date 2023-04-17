import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from '../forum/entities/forum.entity';
import { Training } from '../training/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Forum, Training])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
