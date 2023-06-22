import { Entity, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity('options')
export class Option extends BaseEntity {
  @Column({ type: 'varchar' })
  text: string;

  @Column({
    type: 'boolean',
  })
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  question: Question;
}
