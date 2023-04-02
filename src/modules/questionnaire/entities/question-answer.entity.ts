import { Column, Entity, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { QuestionType } from '../enum/question-type.enum';
import { BaseEntity } from '../../../base/base.entity';
import { Response } from './response.entity';

@Entity()
export class QuestionAnswer extends BaseEntity {
  @ManyToOne(() => Response, (response) => response.questionAnswers)
  response: Response;

  @ManyToOne(() => Question, (question) => question.answer)
  question: Question;

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

  @Column('integer', {
    array: true,
    nullable: true,
  })
  multipleChoices: number[];

  @Column({
    nullable: true,
  })
  text: string;
}
