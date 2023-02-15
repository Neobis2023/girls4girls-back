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
    example: 'Player',
    description: 'Firstname of a user',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    example: 'Blare',
    description: 'Surname of a user',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    example: '996553404406',
    description: 'Phone number of a user',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
