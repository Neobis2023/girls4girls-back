import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mentor } from './entities/mentor.entity';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { EditMentorDto } from './dto/edit-mentor.dto';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class MentorService extends BaseService<Mentor> {
  constructor(
    @InjectRepository(Mentor)
    private readonly mentorRepo: Repository<Mentor>,
  ) {
    super(mentorRepo);
  }

  async addOne(mentorDto: CreateMentorDto) {
    return await this.mentorRepo.save(mentorDto);
  }

  async editOne(mentorId: number, editMentorDto: EditMentorDto) {
    const mentor = await this.mentorRepo.findOne({ where: { id: mentorId } });
    Object.assign(mentor, editMentorDto);
    return await this.mentorRepo.save(mentor);
  }
}
