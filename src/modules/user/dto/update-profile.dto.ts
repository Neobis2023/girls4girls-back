import { BaseDto } from '../../../base/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumberDecorator } from '../../../utils/decorators/is-phone-number.decorator';
import { UserGenderEnum } from '../enums/user-gender.enum';
import { RegionEnum } from '../../../utils/enum/region.enum';

export class UpdateProfileDto extends BaseDto {
  id?: number;

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
    description: 'Birthday',
    example: '2001-07-23T10:30:40.000Z',
    required: false,
  })
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({
    enum: Object.keys(UserGenderEnum),
    required: false,
  })
  @IsEnum(UserGenderEnum)
  @IsOptional()
  gender: UserGenderEnum;

  @ApiProperty({
    example: RegionEnum.CHUI,
    enum: RegionEnum,
    required: false,
  })
  @IsEnum(RegionEnum)
  @IsOptional()
  region: RegionEnum;

  updatedAt?: Date;
}
