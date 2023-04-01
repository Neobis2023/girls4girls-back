import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity()
export class UnregisteredUser extends BaseEntity {
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
}
