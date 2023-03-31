import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserGenderEnum } from '../enums/user-gender.enum';
import { StatusEnum } from '../enums/user-status.enum';
import { Jeton } from '../../jeton/entities/jeton.entity';
import { Likes } from 'src/modules/likes/entities/like.entity';
import { Mentee } from 'src/modules/mentee/entities/mentee.entity';
import { Training } from 'src/modules/training/entities';

@Entity()
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
    default: UserGenderEnum.FEMALE,
  })
  gender: UserGenderEnum;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.VISITOR,
  })
  status: StatusEnum;

  @Column({
    type: 'boolean',
    default: false,
  })
  confirmed: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @ManyToMany(() => Jeton, (jeton) => jeton.users)
  @JoinTable()
  jetons: Jeton[];

  @OneToMany(() => Likes, (likes) => likes.user, { cascade: true })
  likes: Likes[];

  @OneToOne(() => Mentee, (mentee) => mentee.mentee, { cascade: true })
  @JoinColumn()
  mentee: Mentee;

  @ManyToMany(() => Training, (training) => training.user)
  @JoinTable()
  training: Training;
}
