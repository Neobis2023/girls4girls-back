import { Image } from '../../image/entities/image.entity';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJetonDto {
  @ApiProperty({
    example: 'Назваение ачивки на русском',
    description: 'title of a jeton',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Название ачивки на кыргызском',
    description: 'title of a jeton',
  })
  @IsString()
  @IsOptional()
  titleKG: string;

  @ApiProperty({
    example: 'Описание ачивки',
    description: 'description of a jeton',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Ачивканын суроттомосу',
    description: 'description of a jeton',
  })
  @IsString()
  @IsOptional()
  descriptionKG: string;

  @IsOptional()
  image?: Image;
}
