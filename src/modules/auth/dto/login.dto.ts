import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'playerone@gmail.com',
    description: 'Email of a user',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '996555102030',
    description: 'Phone number of a user',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: 'Player01',
    description: 'Password of a user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
