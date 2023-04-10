import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class AskingQuestions extends BaseEntity {
  @ManyToOne(() => Content, (content) => content.questions, {
    onDelete: 'CASCADE',
  })
  content: Content[];

  @Column()
  question: string;

  @Column()
  answer: string;
}
