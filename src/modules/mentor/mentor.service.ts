import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorEntity } from './entities/mentor.entity';
import { MentorDto } from './dto/mentor.dto';
import { EditMentorDto } from './dto/edit.mentor.dto';

@Injectable()
export class MentorService {
    constructor(
        @InjectRepository(MentorEntity) private readonly mentorRepo: Repository<MentorEntity>
    ){}


    async getAll(){
        return await this.mentorRepo.find();
    }


    async getOne(mentor_id: number){
        return await this.mentorRepo.findOne({where:{id: mentor_id}});
    }


    async addOne(mentorDto: MentorDto){
        return await this.mentorRepo.save(mentorDto);
    }


    async editOne(mentor_id: number, editMentorDto: EditMentorDto){
        const mentor =  await this.mentorRepo.findOne({where:{id: mentor_id}});
        Object.assign(mentor, editMentorDto);
        return await this.mentorRepo.save(mentor)
    }

    
    async deleteOne(mentor_id: number){
        const mentor =  await this.mentorRepo.findOne({where:{id: mentor_id}});
        return await this.mentorRepo.remove(mentor)
    }

}
