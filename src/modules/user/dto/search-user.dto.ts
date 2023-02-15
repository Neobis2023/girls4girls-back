import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchUserDto {
  @ApiProperty({
    example: 'playerone@gmail.com',
    description: 'Email of a user',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '996553404406',
    description: 'Phone number of a user',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
