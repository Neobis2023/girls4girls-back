import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { QuestionnaireQuestion } from './questionnaire-question.entity';
import { Training } from '../../training/entities';
import { QuestionnaireResponse } from './questionnaire-response.entity';

@Entity()
export class Questionnaire extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(
    () => QuestionnaireQuestion,
    (question) => question.questionnaire,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  questions: QuestionnaireQuestion[];

  @OneToOne(() => Training, (training) => training.questionnaire)
  training: Training;

  @OneToMany(
    () => QuestionnaireResponse,
    (response) => response.questionnaire,
    {
      cascade: true,
    },
  )
  responses: QuestionnaireResponse[];
}
