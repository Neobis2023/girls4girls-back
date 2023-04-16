import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Image } from '../../image/entities/image.entity';
import { IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { JetonType } from '../enums/jeton-type.enum';

@Entity()
export class Jeton extends BaseEntity {
  @Column()
  @IsString()
  title: string;

  @Column({
    nullable: true,
  })
  titleKG: string;

  @Column()
  @IsString()
  description: string;

  @Column({
    nullable: true,
  })
  descriptionKG: string;

  @Column({
    type: 'enum',
    enum: JetonType,
    default: JetonType.CARD,
  })
  type: JetonType;

  @Column({
    nullable: true,
  })
  quantityToGet: number;

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  image: Image;

  @ManyToMany(() => User, (user) => user.jetons)
  users: User[];
}
