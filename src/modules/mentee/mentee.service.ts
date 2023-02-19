import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreateMenteeDto } from './dto/create-mentee.dto';
import { MenteeEntity } from './entities/mentee.entity';

@Injectable()
export class MenteeService extends BaseService<MenteeEntity> {
  constructor(
    @InjectRepository(MenteeEntity)
    private readonly menteeRepo: Repository<MenteeEntity>,
  ) {
    super(menteeRepo);
  }

  async addOne(menteeDto: CreateMenteeDto) {
    return await this.menteeRepo.save(menteeDto);
  }
}
