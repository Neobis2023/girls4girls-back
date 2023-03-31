import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Mentee } from './entities/mentee.entity';
import { CreateMenteeDto } from './dto/create-mentee.dto';

@Injectable()
export class MenteeService extends BaseService<Mentee> {
  constructor(
    @InjectRepository(Mentee)
    private readonly menteeRepo: Repository<Mentee>,
  ) {
    super(menteeRepo);
  }

  async getAll(){
    return await this.menteeRepo.find();
}

async getOne(mentee_id: number){
    return await this.menteeRepo.findOne({where:{id: mentee_id}})
}

async deleteOne(mentee_id: number){
    const mentee = await this.menteeRepo.findOne({where: {id: mentee_id}})
    if(!mentee)throw new BadRequestException("Менти c таким id нет")
    return await this.menteeRepo.remove(mentee)
}
}
