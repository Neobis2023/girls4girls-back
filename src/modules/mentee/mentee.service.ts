import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorEntity } from '../mentor/entities/mentor.entity';
import { MenteeDto } from './dto/mentee.dto';
import { MenteeEntity } from './entities/mentee.entity';

@Injectable()
export class MenteeService {

    constructor (
        @InjectRepository(MenteeEntity) 
        private readonly menteeRepo: Repository<MenteeEntity>,

        // @InjectRepository(MentorEntity) 
        // private readonly mentorRepo: Repository<MentorEntity>
    ){}

    async getAll(){
        return await this.menteeRepo.find();
    }

    async getOne(mentee_id: number){
        return await this.menteeRepo.findOne({where:{id: mentee_id}})
    }

    async addOne(menteeDto: MenteeDto){
        return await this.menteeRepo.save(menteeDto)
    }

    async deleteOne(mentee_id: number){
        const mentee = await this.menteeRepo.findOne({where: {id: mentee_id}})
        if(!mentee)throw new BadRequestException("Менти c таким id нет")
        return await this.menteeRepo.remove(mentee)
    }
}
