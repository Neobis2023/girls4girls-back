import { Image } from '../../image/entities/image.entity';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JetonType } from '../enums/jeton-type.enum';
import { Type } from 'class-transformer';

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

  @ApiProperty({
    example: JetonType.CARD,
    enum: JetonType,
    required: false,
  })
  @IsEnum(JetonType)
  @IsOptional()
  type: JetonType;

  @ApiProperty({
    example: 10,
    description: 'Количество активностей чтобы получить ачивку',
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  quantityToGet: number;

  @IsOptional()
  image?: Image;
}
