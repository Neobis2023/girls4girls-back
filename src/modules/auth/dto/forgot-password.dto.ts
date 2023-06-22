import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../../base/dto/base.dto';

export class ForgotPasswordDto extends BaseDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email for getting a code',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: '996555010101',
    description: 'Phone number to get a code',
  })
  @IsString()
  @IsOptional()
  phoneNumber: string;
}
