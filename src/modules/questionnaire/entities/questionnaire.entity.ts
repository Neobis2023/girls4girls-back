import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Question } from './question.entity';
import { Training } from '../../training/entities';
import { Response } from './response.entity';

@Entity()
export class Questionnaire extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Question, (question) => question.questionnaire, {
    cascade: true,
  })
  @JoinColumn()
  questions: Question[];

  @OneToOne(() => Training, (training) => training.questionnaire)
  training: Training;

  @OneToMany(() => Response, (response) => response.questionnaire, {
    cascade: true,
  })
  responses: Response[];
}
