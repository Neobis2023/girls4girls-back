import { BaseEntity } from 'src/base/base.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { TrainingRuEntity } from './training-ru.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Training extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  address: string;

  @OneToMany(() => Image, (image) => image.training, {
    cascade: true,
  })
  image: Image[];

  @CreateDateColumn()
  eventDate?: Date;

  @CreateDateColumn()
  endDate?: Date;

  @OneToOne(() => TrainingRuEntity, (ru) => ru.training)
  ru: TrainingRuEntity[];

  @ManyToMany(() => User, (user) => user.training)
  @JoinTable()
  user: User[];
}
