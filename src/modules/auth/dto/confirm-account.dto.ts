import { BaseDto } from '../../../base/dto/base.dto';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmAccountDto extends BaseDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email of a user',
  })
  @IsOptional()
  email: string;

  @ApiProperty({
    example: '996500102030',
    description: 'Phone number of a user',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: '112233',
    description: 'Code to check',
  })
  @MaxLength(6)
  @MinLength(6)
  code: string;
}
