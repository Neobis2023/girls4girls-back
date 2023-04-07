import { BaseEntity } from '../../../base/base.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Questionnaire } from './questionnaire.entity';
import { QuestionAnswer } from './question-answer.entity';

@Entity()
export class QuestionnaireResponse extends BaseEntity {
  @ManyToOne(() => User, (user) => user.response, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.responses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  questionnaire: Questionnaire;

  @OneToMany(
    () => QuestionAnswer,
    (questionAnswer) => questionAnswer.response,
    { cascade: true },
  )
  questionAnswers: QuestionAnswer[];
}
