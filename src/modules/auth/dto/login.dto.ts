import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumberDecorator } from '../../../utils/decorators/is-phone-number.decorator';

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
  @IsPhoneNumberDecorator()
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
