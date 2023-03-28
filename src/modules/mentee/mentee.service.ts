import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Training } from '../training/entities/training.entity';
import { User } from '../user/entities/user.entity';
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

  

}
