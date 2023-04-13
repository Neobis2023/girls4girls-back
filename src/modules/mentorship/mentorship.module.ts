import { Module } from '@nestjs/common';
import { MentorshipService } from './mentorship.service';
import { MentorshipController } from './mentorship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorShip } from './entities/mentorship.entity';
import { Questionnaire } from '../questionnaire/entities/questionnaire.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MentorShip, Questionnaire]), UserModule],
  providers: [MentorshipService],
  controllers: [MentorshipController],
})
export class MentorshipModule {}
