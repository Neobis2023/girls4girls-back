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
import { UserToTraining } from './users-to-training.entity';
import { Questionnaire } from '../../questionnaire/entities/questionnaire.entity';
import { TrainingKg } from './training-kg.entity';
import { Lecturer } from 'src/modules/lecturers/entities/lecturer.entity';

@Entity()
export class Training extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  titleKG: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  descriptionKG: string;

  @Column({ type: 'text', nullable: true })
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

  @Column({
    nullable: true,
  })
  locationKG: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(() => Image, (image) => image.training, {
    cascade: true,
  })
  images: Image[];

  @OneToOne(() => Questionnaire, (questionnaire) => questionnaire.training)
  @JoinColumn()
  questionnaire: Questionnaire;

  @OneToMany(() => UserToTraining, (userToTraining) => userToTraining.training)
  @JoinTable()
  userToTraining: UserToTraining[];

  @OneToOne(() => TrainingKg)
  @JoinColumn()
  kg: TrainingKg;

  @OneToMany(() => Lecturer, (lecturer) => lecturer.training, {
    cascade: true,
  })
  @JoinColumn()
  lecturers: Lecturer[];
}
