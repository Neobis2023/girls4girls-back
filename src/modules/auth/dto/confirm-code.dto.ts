import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmCodeDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email for confirming a code',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '996500101010',
    description: 'Phone number for confirming a code',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: '112233',
    description: 'code',
  })
  @IsString()
  code: string;
}
