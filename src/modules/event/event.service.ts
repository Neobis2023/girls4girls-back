import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from '../forum/entities/forum.entity';
import { LessThan, MoreThan, Not, Repository } from 'typeorm';
import { Training } from '../training/entities';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepo: Repository<Forum>,
    @InjectRepository(Training)
    private readonly trainingRepo: Repository<Training>,
  ) {}

  async getRecentPastEvents(): Promise<(Forum | Training)[]> {
    const pastEvents = await Promise.all([
      this.forumRepo.find({
        where: { eventDate: LessThan(new Date()) },
        order: { eventDate: 'DESC' },
        relations: ['images'],
      }),
      this.trainingRepo.find({
        where: { eventDate: LessThan(new Date()) },
        order: { eventDate: 'DESC' },
        relations: ['images'],
      }),
    ]);

    const allEvents = pastEvents
      .flat()
      .sort((a, b) => b.eventDate.getTime() - a.eventDate.getTime());

    return allEvents;
  }

  async getUpcomingEvents(): Promise<(Forum | Training)[]> {
    const upcomingEvents = await Promise.all([
      this.forumRepo.find({
        where: { eventDate: MoreThan(new Date()) },
        order: { eventDate: 'ASC' },
        relations: ['images'],
      }),
      this.trainingRepo.find({
        where: { eventDate: MoreThan(new Date()) },
        order: { eventDate: 'ASC' },
        relations: ['images'],
      }),
    ]);

    const allEvents = upcomingEvents
      .flat()
      .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());

    return allEvents;
  }
}
