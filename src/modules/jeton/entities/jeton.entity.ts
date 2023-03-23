import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Image } from '../../image/entities/image.entity';
import { IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Jeton extends BaseEntity {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  image: Image;

  @ManyToMany(() => User, (user) => user.jetons)
  users: User[];
}
