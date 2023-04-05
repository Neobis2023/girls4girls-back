import { BaseEntity } from 'src/base/base.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { TrainingRuEntity } from './training-ru.entity';
import { UserToTraining } from './users-to-training.entity';
import { Questionnaire } from '../../questionnaire/entities/questionnaire.entity';

@Entity()
export class Training extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  address: string;

  @CreateDateColumn()
  eventDate?: Date;

  @CreateDateColumn({
    nullable: true,
  })
  deadlineDate?: Date;

  @Column({
    nullable: true,
  })
  time: string;

  @Column({
    nullable: true,
  })
  location: string;

  @OneToMany(() => Image, (image) => image.training, {
    cascade: true,
  })
  images: Image[];

  @OneToOne(() => Questionnaire, (questionnaire) => questionnaire.training)
  @JoinColumn()
  questionnaire: Questionnaire;

  @OneToOne(() => TrainingRuEntity, (ru) => ru.training)
  ru: TrainingRuEntity[];

  @OneToMany(() => UserToTraining, (userToTraining) => userToTraining.training)
  @JoinTable()
  userToTraining: UserToTraining[];
}
