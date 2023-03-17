import { Image } from '../../image/entities/image.entity';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJetonDto {
  @ApiProperty({
    example: 'Title of a jeton',
    description: 'title of a jeton',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Description of a jeton',
    description: 'description of a jeton',
  })
  @IsString()
  description: string;

  @IsOptional()
  image?: Image;
}
