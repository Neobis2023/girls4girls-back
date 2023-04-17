import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from '../forum/entities/forum.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
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
    const pastForum = await this.forumRepo.find({
      where: { eventDate: LessThan(new Date()) },
      order: { eventDate: 'DESC' },
      relations: ['images'],
    });
    const pastTrainings = await this.trainingRepo.find({
      where: { eventDate: LessThan(new Date()) },
      order: { eventDate: 'DESC' },
      relations: ['images'],
    });
    return [...pastForum, ...pastTrainings];
  }

  async getUpcominEvents(): Promise<(Forum | Training)[]> {
    const upcomingForum = await this.forumRepo.find({
      where: { eventDate: MoreThan(new Date()) },
      order: { eventDate: 'ASC' },
      relations: ['images'],
    });
    const upcomingTraining = await this.trainingRepo.find({
      where: { eventDate: MoreThan(new Date()) },
      order: { eventDate: 'ASC' },
      relations: ['images'],
    });
    return [...upcomingForum, ...upcomingTraining];
  }
}
