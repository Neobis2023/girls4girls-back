import { Column, Entity, ManyToOne } from 'typeorm';
import { QuestionnaireQuestion } from './questionnaire-question.entity';
import { BaseEntity } from '../../../base/base.entity';

@Entity()
export class Variant extends BaseEntity {
  @Column({
    nullable: true,
  })
  text: string;

  @ManyToOne(() => QuestionnaireQuestion, (question) => question.variants)
  question: QuestionnaireQuestion;
}
