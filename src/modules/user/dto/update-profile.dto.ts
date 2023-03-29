import { BaseDto } from '../../../base/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumberDecorator } from '../../../utils/decorators/is-phone-number.decorator';
import { UserGenderEnum } from '../enums/user-gender.enum';

export class UpdateProfileDto extends BaseDto {
  @ApiProperty({
    example: 'playerone@gmail.com',
    description: 'Email of a user',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'Player',
    description: 'Firstname of a user',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: 'Blare',
    description: 'Surname of a user',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    example: '996555010101',
    required: false,
  })
  @IsPhoneNumberDecorator()
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    example: '29-03-2023',
    required: false,
  })
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({
    enum: Object.keys(UserGenderEnum),
  })
  @IsEnum(UserGenderEnum)
  gender: UserGenderEnum;
}
