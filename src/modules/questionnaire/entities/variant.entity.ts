import { Column, Entity, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { BaseEntity } from '../../../base/base.entity';

@Entity()
export class Variant extends BaseEntity {
  @Column({
    nullable: true,
  })
  text: string;

  @ManyToOne(() => Question, (question) => question.variants)
  question: Question;
}
