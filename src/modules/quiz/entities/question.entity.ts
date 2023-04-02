import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Option } from './option.entity';
import { Quiz } from './quiz.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity('questions')
export class Question extends BaseEntity {
  @Column('text')
  question: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  quiz: Quiz;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  options: Option[];
}
