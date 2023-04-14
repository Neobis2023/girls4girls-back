import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FeedbackStatusEnum } from '../enum/feedback-status.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity()
export class Feedback extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: FeedbackStatusEnum,
    nullable: true,
  })
  status: FeedbackStatusEnum;

  @ManyToOne(() => User, (user) => user.feedback, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
