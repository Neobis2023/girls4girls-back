import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreateMenteeDto } from './dto/create-mentee.dto';
import { Mentee } from './entities/mentee.entity';

@Injectable()
export class MenteeService extends BaseService<Mentee> {
  constructor(
    @InjectRepository(Mentee)
    private readonly menteeRepo: Repository<Mentee>,
  ) {
    super(menteeRepo);
  }

  async addOne(menteeDto: CreateMenteeDto) {
    return await this.menteeRepo.save(menteeDto);
  }
}
