import { Column, Entity } from 'typeorm';
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

  @Column()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column()
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
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

  // image: object;
}
