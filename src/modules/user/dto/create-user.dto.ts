import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserGenderEnum } from '../enums/user-gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../base/dto/base.dto';

export class CreateUserDto extends BaseDto {
  @ApiProperty({
    example: 'playerone@gmail.com',
    description: 'Email of a user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Player01',
    description: 'Password of a user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Player',
    description: 'Firstname of a user',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Blare',
    description: 'Surname of a user',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: '996555010101',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: Date,
    format: 'date-time',
  })
  // @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({
    type: 'enum',
    enum: UserGenderEnum,
    default: UserGenderEnum.FEMALE,
  })
  @IsOptional()
  gender: UserGenderEnum;
}
