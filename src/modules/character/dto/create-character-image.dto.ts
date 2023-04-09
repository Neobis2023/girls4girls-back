import { Image } from '../../image/entities/image.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDto } from '../../../base/dto/base.dto';

export class CreateCharacterImageDto extends BaseDto {
  @ApiProperty({
    example: 'Blue',
  })
  @IsString()
  title: string;

  images?: Image[];
}
