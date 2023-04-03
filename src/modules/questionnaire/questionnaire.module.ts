import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireQuestion } from './entities/questionnaire-question.entity';
import { Questionnaire } from './entities/questionnaire.entity';
import { Variant } from './entities/variant.entity';
import { QuestionnaireResponse } from './entities/questionnaire-response.entity';
import { QuestionAnswer } from './entities/question-answer.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Questionnaire,
      QuestionnaireQuestion,
      Variant,
      QuestionnaireResponse,
      QuestionAnswer,
    ]),
    UserModule,
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
})
export class QuestionnaireModule {}
