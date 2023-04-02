import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Questionnaire } from './entities/questionnaire.entity';
import { Variant } from './entities/variant.entity';
import { Response } from './entities/response.entity';
import { QuestionAnswer } from './entities/question-answer.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Questionnaire,
      Question,
      Variant,
      Response,
      QuestionAnswer,
    ]),
    UserModule,
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
})
export class QuestionnaireModule {}
