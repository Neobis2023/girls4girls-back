import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { MentorShip } from './entities/mentorship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMentorshipDto } from './dto/create-mentorship.dto';
import { Questionnaire } from '../questionnaire/entities/questionnaire.entity';
import { ApplyToMentorshipDto } from './dto/apply-to-mentorship.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MentorshipService extends BaseService<MentorShip> {
  constructor(
    @InjectRepository(MentorShip)
    private readonly mentorshipRepo: Repository<MentorShip>,
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepo: Repository<Questionnaire>,
    private readonly userService: UserService,
  ) {
    super(mentorshipRepo);
  }

  async createOne(mentorship: CreateMentorshipDto, questionnaireId: number) {
    const newMentorship = new MentorShip();
    newMentorship.name = mentorship.name;
    await this.mentorshipRepo.save(mentorship);
    const questions = await this.questionnaireRepo.findOne({
      where: { id: questionnaireId },
    });
    if (!questions) {
      throw new BadRequestException('Анкеты с таким id не существует');
    }
    newMentorship.questionnaire = questions;
    return this.mentorshipRepo.save(newMentorship);
  }

  async deleteOne(id: number) {
    const flow = await this.mentorshipRepo.findOneBy({ id: id });
    return await this.mentorshipRepo.remove(flow);
  }

  async applyToMentorship(applyToMentorshipDto: ApplyToMentorshipDto) {
    const { userId, mentorshipId } = applyToMentorshipDto;
    const user = await this.userService.get(userId);
    const mentorship = await this.get(mentorshipId);
    if (!mentorship) {
      throw new BadRequestException('Поток с таким id не найден');
    }
  }
}
