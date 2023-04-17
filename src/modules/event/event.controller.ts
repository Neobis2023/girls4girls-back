import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Forum } from '../forum/entities/forum.entity';
import { Training } from '../training/entities';

@ApiTags('Мероприятия')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('recent/past/evetns')
  @ApiOperation({ summary: 'Получить прошедшие события (главная старница)' })
  async getRecentPastEvents(): Promise<(Forum | Training)[]> {
    return await this.eventService.getRecentPastEvents();
  }

  @Get('upcoming/events')
  @ApiOperation({ summary: 'Получить предстоящие события (главная старница)' })
  async getUpcomingEvents(): Promise<(Forum | Training)[]> {
    return await this.eventService.getUpcominEvents();
  }
}
