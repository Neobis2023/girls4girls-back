import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Questionnaire } from './questionnaire.entity';
import { Variant } from './variant.entity';
import { QuestionType } from '../enum/question-type.enum';
import { QuestionAnswer } from './question-answer.entity';

@Entity()
export class QuestionnaireQuestion extends BaseEntity {
  @Column()
  text: string;

  @Column({ nullable: true })
  textKG: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  descriptionKG: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.TEXT,
  })
  type: QuestionType;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.questions)
  questionnaire: Questionnaire;

  @OneToMany(() => Variant, (variant) => variant.question)
  @JoinColumn()
  variants: Variant[];

  @ManyToOne(() => Variant, (variant) => variant.question)
  correctVariant: Variant;

  @OneToMany(() => QuestionAnswer, (answer) => answer.question)
  answer: QuestionAnswer[];
}
