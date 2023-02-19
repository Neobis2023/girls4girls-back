import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorEntity } from './entities/mentor.entity';
import { CreateMentorDto } from './dto/create.mentor.dto';
import { EditMentorDto } from './dto/edit.mentor.dto';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class MentorService extends BaseService<MentorEntity> {
  constructor(
    @InjectRepository(MentorEntity) private readonly mentorRepo: Repository<MentorEntity>
  ){
    super(mentorRepo)
  }
  
  async addOne(mentorDto: CreateMentorDto){
    return await this.mentorRepo.save(mentorDto);
  }

  async editOne(mentor_id: number, editMentorDto: EditMentorDto){
    const mentor =  await this.mentorRepo.findOne({where:{id: mentor_id}});
    Object.assign(mentor, editMentorDto);
    return await this.mentorRepo.save(mentor)
  }
}
