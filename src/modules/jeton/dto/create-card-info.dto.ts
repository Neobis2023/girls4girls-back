import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Image } from '../../image/entities/image.entity';

export class CreateCardInfoDto {
  @ApiProperty({
    example: 'Имя человека на карточке',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Описания человека на карточке',
  })
  @IsString()
  info: string;

  @ApiProperty({
    example: 'Карточкадагы адамдын суроттомосу',
  })
  @IsString()
  infoKG: string;

  image?: Image;
}
