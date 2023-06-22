import { Column, Entity, ManyToOne } from 'typeorm';
import { QuestionnaireQuestion } from './questionnaire-question.entity';
import { QuestionType } from '../enum/question-type.enum';
import { BaseEntity } from '../../../base/base.entity';
import { QuestionnaireResponse } from './questionnaire-response.entity';

@Entity()
export class QuestionAnswer extends BaseEntity {
  @ManyToOne(
    () => QuestionnaireResponse,
    (response) => response.questionAnswers,
  )
  response: QuestionnaireResponse;

  @ManyToOne(() => QuestionnaireQuestion, (question) => question.answer)
  question: QuestionnaireQuestion;

  @Column({
    nullable: true,
  })
  questionText: string;

  @Column({
    nullable: true,
  })
  questionTextKG: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.TEXT,
  })
  type: QuestionType;

  @Column({
    nullable: true,
  })
  answerIndex: number;

  @Column({
    nullable: true,
  })
  answerText: string;

  @Column('varchar', {
    array: true,
    nullable: true,
  })
  multipleChoices: string[];

  @Column({
    nullable: true,
  })
  text: string;
}
