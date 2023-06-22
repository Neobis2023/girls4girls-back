import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/dto/base.dto';

export class EditFooterDto extends BaseDto {
  @ApiProperty({ example: 'girlsforgirls@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'girlsforgirls' })
  @IsNotEmpty()
  @IsString()
  linkedin: string;

  @ApiProperty({ example: 'girlsforgirls' })
  @IsNotEmpty()
  @IsString()
  youtube: string;

  @ApiProperty({ example: 'girls4girls' })
  @IsNotEmpty()
  @IsString()
  instagram: string;
}
